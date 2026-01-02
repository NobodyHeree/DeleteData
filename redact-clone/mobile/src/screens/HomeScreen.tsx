import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import discordService from '../services/discord.service';
import { DiscordServer, User } from '../types';

interface HomeScreenProps {
  navigation: any;
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [servers, setServers] = useState<DiscordServer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await discordService.getCurrentUser();
      setUser(currentUser);

      const userServers = await discordService.getServers();
      setServers(userServers);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  const handleLogout = async () => {
    await discordService.logout();
    onLogout();
  };

  const navigateToServer = (server: DiscordServer) => {
    navigation.navigate('ServerDetail', { server });
  };

  const navigateToDMs = () => {
    navigation.navigate('DirectMessages');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5865F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          {user?.avatar && (
            <Image
              source={{
                uri: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
              }}
              style={styles.avatar}
            />
          )}
          <View>
            <Text style={styles.username}>
              {user?.username}#{user?.discriminator}
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      {/* DMs Section */}
      <TouchableOpacity style={styles.dmSection} onPress={navigateToDMs}>
        <Text style={styles.dmIcon}>💬</Text>
        <View style={styles.dmInfo}>
          <Text style={styles.dmTitle}>Messages Privés</Text>
          <Text style={styles.dmSubtitle}>
            Supprimer vos conversations privées
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      {/* Servers List */}
      <View style={styles.serversSection}>
        <Text style={styles.sectionTitle}>Vos Serveurs ({servers.length})</Text>
        <FlatList
          data={servers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.serverCard}
              onPress={() => navigateToServer(item)}
            >
              {item.icon ? (
                <Image
                  source={{
                    uri: `https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`,
                  }}
                  style={styles.serverIcon}
                />
              ) : (
                <View style={styles.serverIconPlaceholder}>
                  <Text style={styles.serverIconText}>
                    {item.name.charAt(0)}
                  </Text>
                </View>
              )}
              <View style={styles.serverInfo}>
                <Text style={styles.serverName}>{item.name}</Text>
                {item.owner && (
                  <Text style={styles.ownerBadge}>Propriétaire</Text>
                )}
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor="#5865F2"
            />
          }
          contentContainerStyle={styles.serversList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  email: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '600',
  },
  dmSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  dmIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  dmInfo: {
    flex: 1,
  },
  dmTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  dmSubtitle: {
    fontSize: 14,
    color: '#999999',
  },
  chevron: {
    fontSize: 24,
    color: '#666666',
  },
  serversSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  serversList: {
    paddingBottom: 16,
  },
  serverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  serverIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  serverIconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5865F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serverIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  serverInfo: {
    flex: 1,
  },
  serverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  ownerBadge: {
    fontSize: 12,
    color: '#5865F2',
    fontWeight: '500',
  },
});

export default HomeScreen;
