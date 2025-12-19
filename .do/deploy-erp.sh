#!/bin/bash

# Script de déploiement pour l'ERP
# Usage: ./deploy-erp.sh

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Déploiement de l'ERP...${NC}"

# Configuration
PROJECT_DIR="/opt/apps/erp"
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

echo -e "${YELLOW}⚠️  Arrêt des conteneurs...${NC}"
docker compose down

echo -e "${BLUE}🔨 Rebuild des images Docker...${NC}"
docker compose build --no-cache

echo -e "${BLUE}🚀 Démarrage des conteneurs...${NC}"
docker compose up -d

# Attendre que les conteneurs démarrent
echo -e "${BLUE}⏳ Attente du démarrage des services...${NC}"
sleep 10

# Vérifier que les conteneurs fonctionnent
if docker compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ Conteneurs démarrés avec succès${NC}"
else
    echo -e "${RED}❌ Erreur: Les conteneurs ne sont pas démarrés${NC}"
    docker compose logs
    exit 1
fi

echo -e "${GREEN}✅ ERP déployé avec succès !${NC}"
echo -e "${GREEN}🌐 ERP accessible à: https://erp.borealytics.com${NC}"

# Afficher la version déployée
echo -e "${BLUE}📌 Version déployée:${NC}"
git log -1 --oneline

# Afficher les logs
echo -e "${BLUE}📋 Logs récents:${NC}"
docker compose logs --tail=20
