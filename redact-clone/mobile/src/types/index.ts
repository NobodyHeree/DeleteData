// Types pour l'application

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

export interface DiscordServer {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

export interface DiscordChannel {
  id: string;
  name: string;
  type: number;
  serverId?: string;
}

export interface DiscordMessage {
  id: string;
  content: string;
  timestamp: string;
  author: {
    id: string;
    username: string;
  };
  channelId: string;
  attachments: any[];
}

export interface DeletionFilter {
  dateFrom?: Date;
  dateTo?: Date;
  keywords?: string[];
  excludeKeywords?: string[];
  channels?: string[];
  servers?: string[];
  includeAttachments?: boolean;
}

export interface DeletionJob {
  id: string;
  platform: 'discord' | 'twitter' | 'reddit' | 'facebook';
  status: 'pending' | 'running' | 'completed' | 'failed';
  filter: DeletionFilter;
  totalMessages: number;
  deletedMessages: number;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  connected: boolean;
}
