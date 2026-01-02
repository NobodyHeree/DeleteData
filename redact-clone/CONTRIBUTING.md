# Guide de Contribution

Merci de vouloir contribuer à Redact Clone ! 🎉

## Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/VOTRE_USERNAME/redact-clone/issues)
2. Créez une nouvelle issue en utilisant le template "Bug Report"
3. Décrivez le bug en détail avec des étapes pour le reproduire

### Proposer une fonctionnalité

1. Vérifiez que la fonctionnalité n'existe pas déjà
2. Créez une issue avec le template "Feature Request"
3. Expliquez clairement la fonctionnalité et son utilité

### Soumettre une Pull Request

1. Forkez le repository
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Faites vos modifications
4. Testez votre code
5. Committez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
6. Pushez vers votre fork (`git push origin feature/ma-fonctionnalite`)
7. Ouvrez une Pull Request

## Standards de code

### TypeScript

- Utilisez TypeScript strict
- Typez toutes les fonctions et variables
- Pas de `any` sauf cas exceptionnels

### Formatage

- Indentation : 2 espaces
- Point-virgules : requis
- Guillemets : simples pour TypeScript, doubles pour JSX

### Nommage

- Variables/Fonctions : `camelCase`
- Composants React : `PascalCase`
- Constantes : `UPPER_CASE`
- Fichiers : `kebab-case.tsx` ou `PascalCase.tsx` pour composants

## Structure des commits

Utilisez des messages de commit clairs :

```
type(scope): description courte

Description détaillée si nécessaire
```

Types :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

Exemples :
```
feat(discord): ajout de la suppression programmée
fix(auth): correction du token refresh
docs(readme): mise à jour des instructions d'installation
```

## Tests

Avant de soumettre une PR :

1. Testez manuellement vos changements
2. Vérifiez qu'il n'y a pas d'erreurs TypeScript (`npm run build`)
3. Testez sur iOS si possible

## Ajouter un nouveau service

Pour ajouter un nouveau service (Twitter, Reddit, etc.) :

### Backend

1. Créez `backend/src/services/votre-service.service.ts`
2. Créez `backend/src/controllers/votre-service.controller.ts`
3. Créez `backend/src/routes/votre-service.routes.ts`
4. Ajoutez les routes dans `server.ts`

### Mobile

1. Ajoutez les types dans `mobile/src/types/index.ts`
2. Créez le service dans `mobile/src/services/votre-service.service.ts`
3. Créez les écrans nécessaires dans `mobile/src/screens/`
4. Mettez à jour la navigation si nécessaire

## Questions ?

N'hésitez pas à ouvrir une issue pour poser des questions !

## License

En contribuant, vous acceptez que vos contributions soient sous license MIT.
