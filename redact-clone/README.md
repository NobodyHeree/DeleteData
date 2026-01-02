# Redact Clone - Application de suppression de données

Application mobile iOS permettant de supprimer en masse des messages et données de Discord et d'autres plateformes sociales.

## 🚀 Fonctionnalités

- ✅ Suppression en masse de messages Discord
- ✅ Support multi-serveurs et DMs
- ✅ Filtres par date, mots-clés
- ✅ Aperçu avant suppression
- ✅ Architecture extensible pour ajouter d'autres services
- 🔜 Support Twitter, Reddit, Facebook, etc.

## 📱 Architecture

```
redact-clone/
├── mobile/           # Application React Native (iOS)
├── backend/          # API Node.js/Express
├── shared/           # Code partagé (types, utils)
└── docs/            # Documentation
```

## 🛠️ Stack Technique

### Mobile (iOS)
- React Native (Expo)
- TypeScript
- React Navigation
- Async Storage
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Discord API
- JWT pour l'authentification

## 📦 Installation

### Prérequis
- Node.js 18+
- Expo CLI
- Compte développeur Apple (pour déploiement iOS)

### Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npm run dev
```

### Setup Mobile

```bash
cd mobile
npm install
npx expo start
```

## 🔧 Configuration

### Backend (.env)
```env
PORT=3000
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
JWT_SECRET=your_jwt_secret
```

### Mobile (app.json)
- Configurez votre bundle identifier
- Ajoutez vos credentials Apple

## 📱 Développement iOS

### Tester sur iPhone

1. **Méthode 1 : Expo Go**
```bash
cd mobile
npx expo start
# Scanner le QR code avec Expo Go sur iPhone
```

2. **Méthode 2 : Development Build**
```bash
cd mobile
eas build --profile development --platform ios
```

3. **Méthode 3 : Simulateur**
```bash
npx expo run:ios
```

## 🔐 Authentification Discord

L'application utilise OAuth2 pour se connecter à Discord :

1. Créer une application sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Ajouter l'URL de redirection : `exp://localhost:8081/--/auth/discord`
3. Copier Client ID et Secret dans `.env`

## 🗺️ Roadmap

- [x] Architecture de base
- [x] Authentification Discord
- [x] Suppression de messages Discord
- [ ] Filtres avancés (sentiment, regex)
- [ ] Suppression programmée
- [ ] Support Twitter
- [ ] Support Reddit
- [ ] Support Facebook
- [ ] Version Android

## 📄 License

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésite pas à ouvrir une issue ou une PR.

## ⚠️ Disclaimer

Cette application est fournie à des fins éducatives. Respectez les conditions d'utilisation des plateformes.
