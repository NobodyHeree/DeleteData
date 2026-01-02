# 🚀 Guide de Démarrage Rapide

## Configuration Discord OAuth

### 1. Créer une application Discord

1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Cliquez sur "New Application"
3. Donnez-lui un nom (ex: "Redact Clone")
4. Acceptez les conditions

### 2. Configurer OAuth2

1. Dans votre application, allez dans "OAuth2" > "General"
2. Copiez votre **Client ID** et **Client Secret**
3. Ajoutez ces URLs de redirection :
   - `http://localhost:3000/api/auth/discord/callback` (backend)
   - `exp://localhost:8081/--/auth/discord` (mobile dev)
   - `redactclone://auth/discord` (mobile prod)

### 3. Configurer les scopes

Dans OAuth2 > URL Generator, sélectionnez :
- `identify` - Accès aux infos de base de l'utilisateur
- `guilds` - Accès à la liste des serveurs
- `messages.read` - Lecture des messages

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Éditez `.env` et ajoutez vos credentials Discord :

```env
DISCORD_CLIENT_ID=votre_client_id
DISCORD_CLIENT_SECRET=votre_client_secret
JWT_SECRET=un_secret_aleatoire_securise
```

Lancez le serveur :

```bash
npm run dev
```

Le backend sera disponible sur `http://localhost:3000`

### Mobile

```bash
cd mobile
npm install
```

Éditez `mobile/src/screens/LoginScreen.tsx` et remplacez :

```typescript
const DISCORD_CLIENT_ID = 'VOTRE_CLIENT_ID_ICI';
```

Éditez `mobile/src/services/discord.service.ts` si nécessaire pour pointer vers votre backend.

Lancez l'app :

```bash
npm start
```

## Tester sur iPhone

### Option 1 : Expo Go (Plus rapide, recommandé pour le développement)

1. Installez [Expo Go](https://apps.apple.com/app/expo-go/id982107779) sur votre iPhone
2. Lancez `npm start` dans le dossier `mobile`
3. Scannez le QR code avec l'appareil photo de votre iPhone
4. L'app s'ouvrira dans Expo Go

**Note** : Votre iPhone et votre ordinateur doivent être sur le même réseau WiFi.

### Option 2 : Development Build (Plus proche de la production)

Installez EAS CLI :

```bash
npm install -g eas-cli
```

Connectez-vous à Expo :

```bash
eas login
```

Créez un build de développement :

```bash
cd mobile
eas build --profile development --platform ios
```

Une fois le build terminé, installez-le sur votre iPhone via le lien fourni.

### Option 3 : Simulateur iOS (Nécessite macOS)

```bash
cd mobile
npm run ios
```

## Utilisation

1. **Lancez le backend** : `cd backend && npm run dev`
2. **Lancez l'app mobile** : `cd mobile && npm start`
3. **Connectez-vous** avec votre compte Discord
4. **Sélectionnez un serveur** ou accédez aux DMs
5. **Configurez les filtres** de suppression
6. **Prévisualisez** les messages qui seront supprimés
7. **Confirmez** la suppression

## Développement

### Structure du projet

```
redact-clone/
├── mobile/               # App React Native
│   ├── src/
│   │   ├── screens/     # Écrans de l'app
│   │   ├── services/    # Services API
│   │   ├── types/       # Types TypeScript
│   │   └── navigation/  # Navigation
│   └── App.tsx
├── backend/             # API Node.js
│   └── src/
│       ├── controllers/ # Logique métier
│       ├── services/    # Services Discord
│       ├── routes/      # Routes API
│       └── middleware/  # Middlewares
└── README.md
```

### Ajouter un nouveau service (Twitter, Reddit, etc.)

1. Créez un nouveau service dans `backend/src/services/`
2. Ajoutez un contrôleur dans `backend/src/controllers/`
3. Créez les routes dans `backend/src/routes/`
4. Mettez à jour l'interface mobile pour supporter le nouveau service

## Dépannage

### "Cannot connect to backend"

- Vérifiez que le backend tourne sur `http://localhost:3000`
- Si vous testez sur un appareil physique, remplacez `localhost` par l'IP de votre ordinateur dans `mobile/src/services/discord.service.ts`

### "OAuth error"

- Vérifiez que vos credentials Discord sont corrects dans `.env`
- Vérifiez que l'URL de redirection est bien configurée dans Discord Developer Portal

### "Network request failed"

- Assurez-vous que votre iPhone et ordinateur sont sur le même réseau
- Vérifiez votre pare-feu

## Ressources

- [Documentation Discord API](https://discord.com/developers/docs)
- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Native](https://reactnative.dev/)

## Support

Pour toute question, ouvrez une issue sur GitHub !
