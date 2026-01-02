import { Router } from 'express';
import { discordController } from '../controllers/discord.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Auth routes (no auth required)
router.post('/auth/discord', discordController.callback);

// Protected routes
router.get('/discord/servers', authMiddleware, discordController.getServers);
router.get('/discord/servers/:serverId/channels', authMiddleware, discordController.getChannels);
router.get('/discord/dms', authMiddleware, discordController.getDMs);
router.get('/discord/channels/:channelId/messages', authMiddleware, discordController.getMessages);
router.post('/discord/preview', authMiddleware, discordController.previewDeletion);
router.post('/discord/delete', authMiddleware, discordController.startDeletion);
router.delete('/discord/channels/:channelId/messages/:messageId', authMiddleware, discordController.deleteMessage);

export default router;
