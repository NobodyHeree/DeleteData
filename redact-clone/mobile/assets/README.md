# Génération des Assets

Pour générer les icônes et images de l'application :

## Icon (1024x1024)

Créez un icône de 1024x1024px et placez-le dans :
- `mobile/assets/icon.png`

Vous pouvez utiliser un service comme :
- [Figma](https://figma.com)
- [Canva](https://canva.com)
- [GIMP](https://gimp.org)

## Splash Screen (1284x2778)

Créez un splash screen et placez-le dans :
- `mobile/assets/splash.png`

## Adaptive Icon (Android - 1024x1024)

Créez un icône adaptatif et placez-le dans :
- `mobile/assets/adaptive-icon.png`

## Favicon (48x48)

Pour le web :
- `mobile/assets/favicon.png`

## Automatisation avec Expo

Expo peut générer automatiquement toutes les variantes d'icônes :

```bash
cd mobile
npx expo prebuild
```

## Couleurs recommandées

- Background: #0a0a0a (noir profond)
- Primary: #5865F2 (bleu Discord)
- Accent: #ff4444 (rouge)
- Text: #ffffff (blanc)

## Logo simple en ASCII pour référence

```
  ╔═══════════════╗
  ║   R E D A C T ║
  ║   C L O N E   ║
  ╚═══════════════╝
       🗑️ 💬
```
