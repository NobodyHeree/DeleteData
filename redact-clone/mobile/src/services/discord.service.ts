import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User,
  DiscordServer,
  DiscordChannel,
  DiscordMessage,
  DeletionFilter,
  DeletionJob,
} from '../types';

const API_URL = __DEV__ ? 'http://localhost:3000/api' : 'YOUR_PRODUCTION_URL';

class DiscordService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 30000,
    });

    // Intercepteur pour ajouter le token à chaque requête
    this.api.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('discord_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Authentification
  async login(code: string): Promise<User> {
    const { data } = await this.api.post('/auth/discord', { code });
    await AsyncStorage.setItem('discord_token', data.accessToken);
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('discord_token');
    await AsyncStorage.removeItem('user');
  }

  async getCurrentUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Récupération des serveurs
  async getServers(): Promise<DiscordServer[]> {
    const { data } = await this.api.get('/discord/servers');
    return data;
  }

  // Récupération des channels d'un serveur
  async getChannels(serverId: string): Promise<DiscordChannel[]> {
    const { data } = await this.api.get(`/discord/servers/${serverId}/channels`);
    return data;
  }

  // Récupération des DMs
  async getDMs(): Promise<DiscordChannel[]> {
    const { data } = await this.api.get('/discord/dms');
    return data;
  }

  // Récupération des messages d'un channel
  async getMessages(
    channelId: string,
    limit: number = 100,
    before?: string
  ): Promise<DiscordMessage[]> {
    const { data } = await this.api.get(`/discord/channels/${channelId}/messages`, {
      params: { limit, before },
    });
    return data;
  }

  // Prévisualisation des messages à supprimer
  async previewDeletion(filter: DeletionFilter): Promise<{
    totalMessages: number;
    messages: DiscordMessage[];
  }> {
    const { data } = await this.api.post('/discord/preview', filter);
    return data;
  }

  // Lancer la suppression
  async startDeletion(filter: DeletionFilter): Promise<DeletionJob> {
    const { data } = await this.api.post('/discord/delete', filter);
    return data;
  }

  // Récupérer le statut d'un job
  async getJobStatus(jobId: string): Promise<DeletionJob> {
    const { data } = await this.api.get(`/discord/jobs/${jobId}`);
    return data;
  }

  // Supprimer un message spécifique
  async deleteMessage(channelId: string, messageId: string): Promise<void> {
    await this.api.delete(`/discord/channels/${channelId}/messages/${messageId}`);
  }
}

export default new DiscordService();
