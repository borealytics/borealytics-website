#!/bin/bash

# Script de déploiement pour le site web Borealytics
# Usage: ./deploy-website.sh

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Déploiement du site web Borealytics...${NC}"

# Configuration
PROJECT_DIR="/var/www/borealytics-website"
BRANCH="main"

# Vérifier que le répertoire existe
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Erreur: Le répertoire $PROJECT_DIR n'existe pas${NC}"
    exit 1
fi

cd $PROJECT_DIR

echo -e "${BLUE}📥 Récupération des dernières modifications...${NC}"
git fetch origin
git reset --hard origin/$BRANCH

echo -e "${BLUE}📦 Installation des dépendances...${NC}"
npm install --production=false

echo -e "${BLUE}🔨 Build du projet...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build réussi${NC}"
else
    echo -e "${RED}❌ Erreur lors du build${NC}"
    exit 1
fi

echo -e "${BLUE}🔄 Redémarrage de Caddy...${NC}"
sudo systemctl reload caddy

echo -e "${GREEN}✅ Déploiement terminé avec succès !${NC}"
echo -e "${GREEN}🌐 Site accessible à: https://borealytics.com${NC}"

# Afficher la version déployée
echo -e "${BLUE}📌 Version déployée:${NC}"
git log -1 --oneline
