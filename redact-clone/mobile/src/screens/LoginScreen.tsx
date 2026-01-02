import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import discordService from '../services/discord.service';

WebBrowser.maybeCompleteAuthSession();

const DISCORD_CLIENT_ID = 'YOUR_DISCORD_CLIENT_ID';
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'redactclone',
  path: 'auth/discord',
});

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const discovery = {
    authorizationEndpoint: 'https://discord.com/api/oauth2/authorize',
    tokenEndpoint: 'https://discord.com/api/oauth2/token',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: DISCORD_CLIENT_ID,
      scopes: ['identify', 'guilds', 'messages.read'],
      redirectUri,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      handleLogin(code);
    }
  }, [response]);

  const handleLogin = async (code: string) => {
    setIsLoading(true);
    try {
      await discordService.login(code);
      onLoginSuccess();
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erreur', 'Impossible de se connecter. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Redact Clone</Text>
        <Text style={styles.subtitle}>
          Supprimez vos anciens messages en toute simplicité
        </Text>

        <View style={styles.features}>
          <FeatureItem
            icon="🗑️"
            text="Suppression en masse de messages Discord"
          />
          <FeatureItem
            icon="🎯"
            text="Filtres intelligents par date et mots-clés"
          />
          <FeatureItem
            icon="👁️"
            text="Aperçu avant suppression"
          />
          <FeatureItem
            icon="🔒"
            text="Sécurisé et privé"
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={() => promptAsync()}
          disabled={!request || isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Connexion...' : 'Se connecter avec Discord'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          En vous connectant, vous acceptez nos conditions d'utilisation
        </Text>
      </View>
    </View>
  );
};

const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 40,
  },
  features: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#cccccc',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#5865F2',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});

export default LoginScreen;
