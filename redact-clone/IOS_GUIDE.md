# 📱 Guide iOS - Tester sur votre iPhone

## Option 1 : Expo Go (Recommandé pour débuter)

### Avantages
- ✅ Installation immédiate
- ✅ Pas besoin de compte développeur Apple
- ✅ Parfait pour le développement
- ✅ Rechargement à chaud

### Limitations
- ❌ Certaines fonctionnalités natives limitées
- ❌ Pas de notifications push natives
- ❌ Ne peut pas être publié sur l'App Store

### Installation

1. **Sur votre iPhone**, téléchargez [Expo Go](https://apps.apple.com/app/expo-go/id982107779)

2. **Sur votre ordinateur**, dans le dossier `mobile` :
   ```bash
   npm start
   ```

3. **Scannez le QR code** avec l'appareil photo de votre iPhone

4. L'app s'ouvrira automatiquement dans Expo Go

### Dépannage Expo Go

**"Unable to connect to server"**
- Assurez-vous que votre iPhone et ordinateur sont sur le même WiFi
- Essayez de changer le mode de connexion : `npm start` puis appuyez sur `s` pour changer

**"Network timeout"**
- Vérifiez votre pare-feu
- Essayez en mode tunnel : `npx expo start --tunnel` (nécessite `npx expo install @expo/ngrok`)

## Option 2 : Development Build (Production-like)

### Avantages
- ✅ Toutes les fonctionnalités natives
- ✅ Plus proche de la version finale
- ✅ Peut utiliser n'importe quel package natif

### Prérequis
- Compte Expo (gratuit)
- Patience (le build prend 10-20 minutes)

### Installation

1. **Installez EAS CLI** :
   ```bash
   npm install -g eas-cli
   ```

2. **Connectez-vous à Expo** :
   ```bash
   eas login
   ```

3. **Configurez le projet** :
   ```bash
   cd mobile
   eas build:configure
   ```

4. **Lancez le build** :
   ```bash
   eas build --profile development --platform ios
   ```

5. **Installez sur votre iPhone** :
   - Une fois le build terminé, vous recevrez un lien
   - Ouvrez le lien sur votre iPhone
   - Téléchargez et installez l'app
   - Allez dans Réglages > Général > Gestion de l'appareil
   - Faites confiance à votre certificat de développement

6. **Lancez le serveur de développement** :
   ```bash
   npx expo start --dev-client
   ```

7. **Ouvrez l'app** sur votre iPhone et scannez le QR code

## Option 3 : Simulateur iOS (macOS uniquement)

### Prérequis
- macOS
- Xcode installé (gratuit depuis l'App Store)

### Installation

1. **Installez Xcode** depuis l'App Store (c'est gros, ~12 GB)

2. **Installez les outils en ligne de commande** :
   ```bash
   xcode-select --install
   ```

3. **Lancez le simulateur** :
   ```bash
   cd mobile
   npm run ios
   ```

Le simulateur iOS se lancera automatiquement avec l'app.

### Choisir un appareil spécifique

```bash
# iPhone 15 Pro
npx expo run:ios --device "iPhone 15 Pro"

# iPhone SE
npx expo run:ios --device "iPhone SE (3rd generation)"
```

Pour voir tous les appareils disponibles :
```bash
xcrun simctl list devices
```

## Option 4 : TestFlight (Distribution Beta)

Pour distribuer à des testeurs :

1. **Créez un compte développeur Apple** ($99/an)

2. **Configurez App Store Connect**

3. **Créez un build de production** :
   ```bash
   eas build --profile production --platform ios
   ```

4. **Soumettez à TestFlight** :
   ```bash
   eas submit --platform ios
   ```

5. **Invitez des testeurs** via App Store Connect

## Problèmes courants

### "Unable to load script from assets"

**Solution 1 - Nettoyer le cache** :
```bash
cd mobile
rm -rf node_modules
npm install
npx expo start -c
```

**Solution 2 - Vérifier le bundler** :
```bash
npx expo start --clear
```

### "CocoaPods not installed"

macOS uniquement :
```bash
sudo gem install cocoapods
```

### "Xcode build failed"

1. Ouvrez le projet dans Xcode :
   ```bash
   cd mobile/ios
   xed .
   ```

2. Dans Xcode, allez dans Product > Clean Build Folder

3. Relancez le build

### "Certificate has expired"

Pour Development Build :
```bash
eas credentials
# Sélectionnez votre projet
# Choisissez "Remove provisioning profile"
# Puis relancez un build
```

## Performance et Optimisation

### Mode Release (plus rapide)

```bash
# Expo Go
npx expo start --no-dev --minify

# Development Build
npx expo start --dev-client --no-dev --minify
```

### Activer Hermes (moteur JS optimisé)

Dans `app.json` :
```json
{
  "expo": {
    "jsEngine": "hermes",
    "ios": {
      "jsEngine": "hermes"
    }
  }
}
```

## Débogage sur iPhone

### Ouvrir le menu de développement

- **Expo Go** : Secouez votre iPhone
- **Development Build** : Secouez votre iPhone ou appuyez sur le bouton dans l'app

### Voir les logs

**Depuis votre ordinateur** :
```bash
npx expo start
# Puis appuyez sur 'j' pour ouvrir le debugger
```

**Depuis Safari** (pour Web Inspector) :
1. Sur iPhone : Réglages > Safari > Avancé > Inspecteur Web
2. Sur Mac : Safari > Développement > [Votre iPhone] > [Votre App]

## Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Expo DevDocs](https://docs.expo.dev/develop/development-builds/introduction/)
- [Apple Developer](https://developer.apple.com/)
- [React Native Debugging](https://reactnative.dev/docs/debugging)

## Besoin d'aide ?

Ouvrez une issue sur GitHub avec :
- Version d'iOS
- Logs d'erreur complets
- Étapes pour reproduire le problème
