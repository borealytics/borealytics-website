#!/bin/bash

# Script de backup PostgreSQL pour l'ERP
# Usage: ./backup-postgres.sh

set -e

# Configuration
BACKUP_DIR="/opt/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/erp_backup_$DATE.sql"
CONTAINER_NAME="erp-postgres"
DB_NAME="erp_db"
DB_USER="erp_user"
RETENTION_DAYS=7

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}📦 Backup de la base de données PostgreSQL...${NC}"

# Créer le répertoire de backup s'il n'existe pas
mkdir -p $BACKUP_DIR

# Vérifier que le conteneur PostgreSQL fonctionne
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo -e "${RED}❌ Erreur: Le conteneur $CONTAINER_NAME n'est pas en cours d'exécution${NC}"
    exit 1
fi

# Créer le backup
echo -e "${BLUE}💾 Création du backup...${NC}"
docker exec $CONTAINER_NAME pg_dump -U $DB_USER $DB_NAME > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backup créé: $BACKUP_FILE${NC}"
else
    echo -e "${RED}❌ Erreur lors de la création du backup${NC}"
    exit 1
fi

# Compresser le backup
echo -e "${BLUE}🗜️  Compression du backup...${NC}"
gzip $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backup compressé: $BACKUP_FILE.gz${NC}"
else
    echo -e "${RED}❌ Erreur lors de la compression${NC}"
    exit 1
fi

# Afficher la taille du backup
BACKUP_SIZE=$(du -h "$BACKUP_FILE.gz" | cut -f1)
echo -e "${BLUE}📊 Taille du backup: $BACKUP_SIZE${NC}"

# Nettoyer les anciens backups (garder seulement les N derniers jours)
echo -e "${BLUE}🧹 Nettoyage des anciens backups (> $RETENTION_DAYS jours)...${NC}"
find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

# Compter les backups restants
BACKUP_COUNT=$(ls -1 $BACKUP_DIR/*.sql.gz 2>/dev/null | wc -l)
echo -e "${GREEN}✅ Backups disponibles: $BACKUP_COUNT${NC}"

echo -e "${GREEN}✅ Backup terminé avec succès !${NC}"
