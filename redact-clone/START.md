# 🚀 DÉMARRAGE RAPIDE - 5 MINUTES

## 📋 Checklist Express

1. **Configurer Discord OAuth** (5 min)
   - Va sur https://discord.com/developers/applications
   - Crée une nouvelle application
   - Dans OAuth2 > General, copie ton Client ID et Client Secret
   - Ajoute cette URL de redirection : `exp://localhost:8081/--/auth/discord`

2. **Installer les dépendances** (2 min)
   ```bash
   # Rapide
   ./setup.sh
   
   # OU manuel
   cd backend && npm install
   cd ../mobile && npm install
   ```

3. **Configurer le backend** (1 min)
   ```bash
   cd backend
   cp .env.example .env
   nano .env  # ou ouvre avec ton éditeur préféré
   ```
   
   Remplace :
   ```
   DISCORD_CLIENT_ID=TON_CLIENT_ID
   DISCORD_CLIENT_SECRET=TON_CLIENT_SECRET
   ```

4. **Configurer l'app mobile** (1 min)
   Édite `mobile/src/screens/LoginScreen.tsx` ligne 15 :
   ```typescript
   const DISCORD_CLIENT_ID = 'TON_CLIENT_ID';
   ```

5. **Lancer l'application** (1 min)
   
   **Terminal 1 - Backend** :
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Mobile** :
   ```bash
   cd mobile
   npm start
   ```

6. **Tester sur iPhone** (30 sec)
   - Télécharge [Expo Go](https://apps.apple.com/app/expo-go/id982107779)
   - Scanne le QR code qui s'affiche
   - C'est tout ! 🎉

## 🎯 Premiers pas dans l'app

1. Clique sur "Se connecter avec Discord"
2. Autorise l'application
3. Sélectionne un serveur Discord
4. Choisis un canal
5. Configure tes filtres (optionnel)
6. Prévisualise les messages
7. Supprime !

## 📚 Documentation complète

- **QUICKSTART.md** - Installation détaillée
- **IOS_GUIDE.md** - Guide complet iOS
- **GITHUB.md** - Pousser sur GitHub
- **CONTRIBUTING.md** - Contribuer au projet

## ❓ Problèmes ?

**Backend ne démarre pas** :
- Vérifie que Node.js 18+ est installé
- Vérifie que le port 3000 est libre

**App ne se connecte pas au backend** :
- Si sur iPhone physique, remplace `localhost` par l'IP de ton PC dans `mobile/src/services/discord.service.ts`
- Vérifie que ton iPhone et PC sont sur le même WiFi

**OAuth Discord échoue** :
- Vérifie tes credentials dans `.env`
- Vérifie l'URL de redirection sur Discord Developer Portal

## 🚀 Pousser sur GitHub

```bash
# Crée un repo sur github.com
# Puis :
git remote add origin https://github.com/TON_USERNAME/redact-clone.git
git push -u origin main
```

## 🎨 Prochaines étapes

- [ ] Personnalise les couleurs et le logo
- [ ] Ajoute d'autres services (Twitter, Reddit)
- [ ] Implémente la suppression programmée
- [ ] Ajoute des statistiques
- [ ] Déploie sur TestFlight

## 💡 Conseils

- Utilise Expo Go pour le développement rapide
- Teste régulièrement sur un vrai iPhone
- Lis les logs dans le terminal pour débugger
- N'hésite pas à ouvrir une issue sur GitHub

Bon développement ! 🎉
