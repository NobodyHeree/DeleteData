# 📤 Guide pour pousser sur GitHub

## Étape 1 : Créer un repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur le bouton **"+"** en haut à droite, puis **"New repository"**
3. Configurez votre repository :
   - **Repository name** : `redact-clone` (ou le nom de votre choix)
   - **Description** : "Application mobile iOS pour supprimer en masse des messages Discord"
   - **Visibility** : Public ou Private selon vos préférences
   - **Ne cochez PAS** "Initialize this repository with a README" (car nous en avons déjà un)
4. Cliquez sur **"Create repository"**

## Étape 2 : Lier votre repository local à GitHub

GitHub vous montrera des commandes. Utilisez celles-ci dans votre terminal :

```bash
cd /path/to/redact-clone

# Ajouter le remote GitHub (remplacez YOUR_USERNAME et REPOSITORY_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Pousser le code vers GitHub
git push -u origin main
```

**Exemple concret :**
```bash
git remote add origin https://github.com/johndoe/redact-clone.git
git push -u origin main
```

## Étape 3 : Vérifier

1. Retournez sur GitHub
2. Rafraîchissez la page de votre repository
3. Vous devriez voir tous vos fichiers !

## Alternative : Utiliser GitHub CLI

Si vous avez [GitHub CLI](https://cli.github.com/) installé :

```bash
cd /path/to/redact-clone

# Créer le repository et le pousser en une commande
gh repo create redact-clone --public --source=. --push
```

## Prochaines étapes

Une fois le code sur GitHub :

1. **Configurez les secrets** pour GitHub Actions (si vous voulez utiliser CI/CD)
2. **Invitez des collaborateurs** si vous travaillez en équipe
3. **Activez GitHub Pages** si vous voulez une documentation en ligne
4. **Créez des branches** pour développer de nouvelles fonctionnalités

## Workflow de développement recommandé

```bash
# Créer une nouvelle branche pour une fonctionnalité
git checkout -b feature/nouvelle-fonctionnalite

# Faire vos modifications...

# Commiter vos changements
git add .
git commit -m "feat: ajout de la nouvelle fonctionnalité"

# Pousser la branche
git push origin feature/nouvelle-fonctionnalite

# Sur GitHub, créez une Pull Request pour merger dans main
```

## Commandes Git utiles

```bash
# Voir le statut des fichiers
git status

# Voir l'historique des commits
git log --oneline

# Mettre à jour votre branche locale avec les changements distants
git pull origin main

# Annuler les changements non commités
git checkout -- .

# Créer un tag pour une version
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

## Protéger votre branche main

Sur GitHub, dans Settings > Branches :

1. Cliquez sur "Add rule"
2. Branch name pattern : `main`
3. Cochez :
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require conversation resolution before merging

Cela empêchera les pushs directs sur main et forcera l'utilisation de Pull Requests.

## Besoin d'aide ?

- [Documentation Git](https://git-scm.com/doc)
- [Documentation GitHub](https://docs.github.com)
- [GitHub Skills](https://skills.github.com/) - Tutoriels interactifs
