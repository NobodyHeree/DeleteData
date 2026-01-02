#!/bin/bash

echo "🚀 Configuration de Redact Clone"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Veuillez installer Node.js 18+ depuis https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) détecté${NC}"
echo ""

# Setup Backend
echo "📦 Installation du Backend..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Fichier .env créé. Veuillez le configurer avec vos credentials Discord${NC}"
fi

npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend installé${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation du backend${NC}"
    exit 1
fi

cd ..

# Setup Mobile
echo ""
echo "📱 Installation de l'application mobile..."
cd mobile
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Application mobile installée${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation de l'app mobile${NC}"
    exit 1
fi

cd ..

echo ""
echo -e "${GREEN}✨ Installation terminée !${NC}"
echo ""
echo "📝 Prochaines étapes :"
echo ""
echo "1. Configurez vos credentials Discord dans backend/.env"
echo "2. Lancez le backend : cd backend && npm run dev"
echo "3. Lancez l'app mobile : cd mobile && npm start"
echo ""
echo "📖 Consultez QUICKSTART.md pour plus de détails"
