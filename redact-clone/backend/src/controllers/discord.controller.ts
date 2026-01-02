import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import discordService from '../services/discord.service';

interface AuthRequest extends Request {
  user?: {
    id: string;
    accessToken: string;
  };
}

export const discordController = {
  // OAuth callback
  async callback(req: Request, res: Response) {
    try {
      const { code } = req.body;

      if (!code) {
        return res.status(400).json({ error: 'Code is required' });
      }

      const tokens = await discordService.exchangeCode(code);
      const user = await discordService.getUserInfo(tokens.access_token);

      const jwtToken = jwt.sign(
        {
          userId: user.id,
          accessToken: tokens.access_token,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.json({
        accessToken: jwtToken,
        user: {
          id: user.id,
          username: user.username,
          discriminator: user.discriminator,
          avatar: user.avatar,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Discord callback error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  },

  // Get user's servers
  async getServers(req: AuthRequest, res: Response) {
    try {
      const guilds = await discordService.getUserGuilds(req.user!.accessToken);
      res.json(guilds);
    } catch (error) {
      console.error('Get servers error:', error);
      res.status(500).json({ error: 'Failed to fetch servers' });
    }
  },

  // Get server channels
  async getChannels(req: AuthRequest, res: Response) {
    try {
      const { serverId } = req.params;
      const channels = await discordService.getGuildChannels(
        req.user!.accessToken,
        serverId
      );
      res.json(channels);
    } catch (error) {
      console.error('Get channels error:', error);
      res.status(500).json({ error: 'Failed to fetch channels' });
    }
  },

  // Get DMs
  async getDMs(req: AuthRequest, res: Response) {
    try {
      const dms = await discordService.getUserDMs(req.user!.accessToken);
      res.json(dms);
    } catch (error) {
      console.error('Get DMs error:', error);
      res.status(500).json({ error: 'Failed to fetch DMs' });
    }
  },

  // Get messages from a channel
  async getMessages(req: AuthRequest, res: Response) {
    try {
      const { channelId } = req.params;
      const { limit = 100, before } = req.query;

      const messages = await discordService.getChannelMessages(
        req.user!.accessToken,
        channelId,
        Number(limit),
        before as string
      );

      res.json(messages);
    } catch (error) {
      console.error('Get messages error:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  },

  // Preview deletion
  async previewDeletion(req: AuthRequest, res: Response) {
    try {
      const filter = req.body;
      const channelId = filter.channels[0];

      // Fetch messages from the channel
      let allMessages: any[] = [];
      let lastMessageId: string | undefined;

      // Fetch up to 1000 messages for preview
      for (let i = 0; i < 10; i++) {
        const messages = await discordService.getChannelMessages(
          req.user!.accessToken,
          channelId,
          100,
          lastMessageId
        );

        if (messages.length === 0) break;

        allMessages = allMessages.concat(messages);
        lastMessageId = messages[messages.length - 1].id;
      }

      // Filter messages based on my user ID
      const myMessages = allMessages.filter(
        (msg) => msg.author.id === req.user!.id
      );

      // Apply filters
      const filteredMessages = discordService.filterMessages(myMessages, filter);

      res.json({
        totalMessages: filteredMessages.length,
        messages: filteredMessages.slice(0, 10),
      });
    } catch (error) {
      console.error('Preview deletion error:', error);
      res.status(500).json({ error: 'Failed to preview deletion' });
    }
  },

  // Start deletion
  async startDeletion(req: AuthRequest, res: Response) {
    try {
      const filter = req.body;
      const channelId = filter.channels[0];

      // Fetch messages
      let allMessages: any[] = [];
      let lastMessageId: string | undefined;

      for (let i = 0; i < 50; i++) {
        const messages = await discordService.getChannelMessages(
          req.user!.accessToken,
          channelId,
          100,
          lastMessageId
        );

        if (messages.length === 0) break;

        allMessages = allMessages.concat(messages);
        lastMessageId = messages[messages.length - 1].id;
      }

      const myMessages = allMessages.filter(
        (msg) => msg.author.id === req.user!.id
      );

      const filteredMessages = discordService.filterMessages(myMessages, filter);

      const messageIds = filteredMessages.map((msg) => msg.id);

      // Start deletion in background
      const jobId = `job_${Date.now()}`;

      // In a real app, you'd use a job queue here
      discordService
        .deleteMessagesInBulk(req.user!.accessToken, channelId, messageIds)
        .then((result) => {
          console.log(`Job ${jobId} completed:`, result);
        })
        .catch((error) => {
          console.error(`Job ${jobId} failed:`, error);
        });

      res.json({
        id: jobId,
        platform: 'discord',
        status: 'running',
        filter,
        totalMessages: messageIds.length,
        deletedMessages: 0,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Start deletion error:', error);
      res.status(500).json({ error: 'Failed to start deletion' });
    }
  },

  // Delete single message
  async deleteMessage(req: AuthRequest, res: Response) {
    try {
      const { channelId, messageId } = req.params;

      await discordService.deleteMessage(
        req.user!.accessToken,
        channelId,
        messageId
      );

      res.json({ success: true });
    } catch (error) {
      console.error('Delete message error:', error);
      res.status(500).json({ error: 'Failed to delete message' });
    }
  },
};
