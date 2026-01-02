import axios from 'axios';
import { Client, GatewayIntentBits, TextChannel, DMChannel } from 'discord.js';

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

interface DiscordTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

class DiscordService {
  private clients: Map<string, Client> = new Map();

  async exchangeCode(code: string): Promise<DiscordTokens> {
    const response = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data;
  }

  async getUserInfo(accessToken: string): Promise<DiscordUser> {
    const response = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  async getUserGuilds(accessToken: string) {
    const response = await axios.get('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }

  async getGuildChannels(accessToken: string, guildId: string) {
    const response = await axios.get(
      `https://discord.com/api/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  }

  async getUserDMs(accessToken: string) {
    const response = await axios.get(
      'https://discord.com/api/users/@me/channels',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  }

  async getChannelMessages(
    userToken: string,
    channelId: string,
    limit: number = 100,
    before?: string
  ) {
    const params: any = { limit };
    if (before) params.before = before;

    const response = await axios.get(
      `https://discord.com/api/channels/${channelId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        params,
      }
    );

    return response.data;
  }

  async deleteMessage(userToken: string, channelId: string, messageId: string) {
    await axios.delete(
      `https://discord.com/api/channels/${channelId}/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  }

  async deleteMessagesInBulk(
    userToken: string,
    channelId: string,
    messageIds: string[]
  ): Promise<{ deleted: number; failed: number }> {
    let deleted = 0;
    let failed = 0;

    for (const messageId of messageIds) {
      try {
        await this.deleteMessage(userToken, channelId, messageId);
        deleted++;
        // Rate limiting: Discord permet ~5 suppressions par seconde
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Failed to delete message ${messageId}:`, error);
        failed++;
      }
    }

    return { deleted, failed };
  }

  filterMessages(messages: any[], filter: any) {
    let filtered = messages;

    // Filter by keywords
    if (filter.keywords && filter.keywords.length > 0) {
      filtered = filtered.filter((msg) =>
        filter.keywords.some((keyword: string) =>
          msg.content.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    // Filter by exclude keywords
    if (filter.excludeKeywords && filter.excludeKeywords.length > 0) {
      filtered = filtered.filter(
        (msg) =>
          !filter.excludeKeywords.some((keyword: string) =>
            msg.content.toLowerCase().includes(keyword.toLowerCase())
          )
      );
    }

    // Filter by date range
    if (filter.dateFrom) {
      const fromDate = new Date(filter.dateFrom);
      filtered = filtered.filter(
        (msg) => new Date(msg.timestamp) >= fromDate
      );
    }

    if (filter.dateTo) {
      const toDate = new Date(filter.dateTo);
      filtered = filtered.filter((msg) => new Date(msg.timestamp) <= toDate);
    }

    return filtered;
  }
}

export default new DiscordService();
