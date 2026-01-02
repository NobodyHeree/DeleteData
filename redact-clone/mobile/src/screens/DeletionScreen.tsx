import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import discordService from '../services/discord.service';
import { DeletionFilter, DiscordMessage } from '../types';

interface DeletionScreenProps {
  route: any;
  navigation: any;
}

const DeletionScreen: React.FC<DeletionScreenProps> = ({ route, navigation }) => {
  const { channelId, channelName, serverId } = route.params;

  const [filter, setFilter] = useState<DeletionFilter>({
    channels: [channelId],
    servers: serverId ? [serverId] : undefined,
  });

  const [keywords, setKeywords] = useState('');
  const [excludeKeywords, setExcludeKeywords] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [previewMessages, setPreviewMessages] = useState<DiscordMessage[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = async () => {
    setIsLoading(true);
    try {
      const updatedFilter: DeletionFilter = {
        ...filter,
        keywords: keywords ? keywords.split(',').map((k) => k.trim()) : undefined,
        excludeKeywords: excludeKeywords
          ? excludeKeywords.split(',').map((k) => k.trim())
          : undefined,
        dateFrom: dateFrom ? new Date(dateFrom) : undefined,
        dateTo: dateTo ? new Date(dateTo) : undefined,
      };

      const result = await discordService.previewDeletion(updatedFilter);
      setPreviewMessages(result.messages);
      setTotalMessages(result.totalMessages);
      setShowPreview(true);
    } catch (error) {
      console.error('Preview error:', error);
      Alert.alert('Erreur', 'Impossible de prévisualiser les messages.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirmation',
      `Êtes-vous sûr de vouloir supprimer ${totalMessages} message(s) ? Cette action est irréversible.`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              const updatedFilter: DeletionFilter = {
                ...filter,
                keywords: keywords
                  ? keywords.split(',').map((k) => k.trim())
                  : undefined,
                excludeKeywords: excludeKeywords
                  ? excludeKeywords.split(',').map((k) => k.trim())
                  : undefined,
                dateFrom: dateFrom ? new Date(dateFrom) : undefined,
                dateTo: dateTo ? new Date(dateTo) : undefined,
              };

              const job = await discordService.startDeletion(updatedFilter);
              Alert.alert(
                'Suppression lancée',
                `La suppression a été lancée. Job ID: ${job.id}`,
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ]
              );
            } catch (error) {
              console.error('Deletion error:', error);
              Alert.alert('Erreur', 'Impossible de lancer la suppression.');
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Supprimer des messages</Text>
        <Text style={styles.subtitle}>{channelName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Filtres de recherche</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mots-clés à inclure (séparés par ,)</Text>
          <TextInput
            style={styles.input}
            value={keywords}
            onChangeText={setKeywords}
            placeholder="spam, promotion, etc."
            placeholderTextColor="#666666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mots-clés à exclure (séparés par ,)</Text>
          <TextInput
            style={styles.input}
            value={excludeKeywords}
            onChangeText={setExcludeKeywords}
            placeholder="important, keep, etc."
            placeholderTextColor="#666666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date de début (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={dateFrom}
            onChangeText={setDateFrom}
            placeholder="2024-01-01"
            placeholderTextColor="#666666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date de fin (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={dateTo}
            onChangeText={setDateTo}
            placeholder="2024-12-31"
            placeholderTextColor="#666666"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.previewButton, isLoading && styles.buttonDisabled]}
        onPress={handlePreview}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Chargement...' : '👁️ Prévisualiser'}
        </Text>
      </TouchableOpacity>

      {showPreview && (
        <View style={styles.previewSection}>
          <Text style={styles.previewTitle}>
            📊 Aperçu : {totalMessages} message(s) trouvé(s)
          </Text>

          {previewMessages.slice(0, 5).map((message) => (
            <View key={message.id} style={styles.messageCard}>
              <Text style={styles.messageAuthor}>{message.author.username}</Text>
              <Text style={styles.messageContent} numberOfLines={2}>
                {message.content || '[Pas de contenu texte]'}
              </Text>
              <Text style={styles.messageDate}>
                {new Date(message.timestamp).toLocaleDateString()}
              </Text>
            </View>
          ))}

          {totalMessages > 5 && (
            <Text style={styles.moreMessages}>
              ... et {totalMessages - 5} message(s) de plus
            </Text>
          )}

          <TouchableOpacity
            style={[styles.deleteButton, isLoading && styles.buttonDisabled]}
            onPress={handleDelete}
            disabled={isLoading}
          >
            <Text style={styles.deleteButtonText}>
              🗑️ Supprimer {totalMessages} message(s)
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999999',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  previewButton: {
    backgroundColor: '#5865F2',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewSection: {
    padding: 20,
    paddingTop: 0,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  messageCard: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  messageAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5865F2',
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 4,
  },
  messageDate: {
    fontSize: 12,
    color: '#666666',
  },
  moreMessages: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default DeletionScreen;
