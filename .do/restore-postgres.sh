#!/bin/bash

# Script de restauration PostgreSQL
# Usage: ./restore-postgres.sh <backup_file.sql.gz>

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
CONTAINER_NAME="erp-postgres"
DB_NAME="erp_db"
DB_USER="erp_user"

# Vérifier les arguments
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ Usage: $0 <backup_file.sql.gz>${NC}"
    echo -e "${BLUE}Backups disponibles:${NC}"
    ls -lh /opt/backups/postgres/*.sql.gz 2>/dev/null || echo "Aucun backup trouvé"
    exit 1
fi

BACKUP_FILE=$1

# Vérifier que le fichier existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}❌ Erreur: Le fichier $BACKUP_FILE n'existe pas${NC}"
    exit 1
fi

echo -e "${YELLOW}⚠️  ATTENTION: Cette opération va ÉCRASER la base de données actuelle !${NC}"
echo -e "${YELLOW}Fichier de backup: $BACKUP_FILE${NC}"
read -p "Êtes-vous sûr de vouloir continuer? (oui/non): " confirmation

if [ "$confirmation" != "oui" ]; then
    echo -e "${BLUE}❌ Restauration annulée${NC}"
    exit 0
fi

# Vérifier que le conteneur fonctionne
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo -e "${RED}❌ Erreur: Le conteneur $CONTAINER_NAME n'est pas en cours d'exécution${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Décompression du backup...${NC}"
TEMP_FILE="/tmp/restore_$(date +%s).sql"
gunzip -c $BACKUP_FILE > $TEMP_FILE

echo -e "${BLUE}🗑️  Suppression de l'ancienne base de données...${NC}"
docker exec $CONTAINER_NAME psql -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
docker exec $CONTAINER_NAME psql -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"

echo -e "${BLUE}💾 Restauration de la base de données...${NC}"
cat $TEMP_FILE | docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_NAME

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Base de données restaurée avec succès !${NC}"
else
    echo -e "${RED}❌ Erreur lors de la restauration${NC}"
    rm -f $TEMP_FILE
    exit 1
fi

# Nettoyer le fichier temporaire
rm -f $TEMP_FILE

echo -e "${GREEN}✅ Restauration terminée !${NC}"
