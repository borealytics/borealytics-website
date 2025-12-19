# Digital Ocean Deployment Files - Multi-Applications

Ce dossier contient tous les fichiers de configuration nécessaires pour déployer vos 3 applications sur Digital Ocean.

## 📁 Structure des fichiers

### Configurations Docker

- **`docker-compose.erp.yml`** - Configuration Docker pour l'ERP avec PostgreSQL
- **`docker-compose.mermaid.yml`** - Configuration Docker pour l'application Mermaid

### Configurations Caddy

- **`Caddyfile`** - Configuration Caddy pour les 3 applications (remplace Nginx)

### Configurations Nginx (Pour référence - non utilisées avec Caddy)

- **`nginx.conf`** - Configuration pour le site web Borealytics (fichiers statiques)
- **`nginx-erp.conf`** - Reverse proxy pour l'ERP (port 3001)
- **`nginx-mermaid.conf`** - Reverse proxy pour l'application Mermaid (port 3002)

### Scripts de déploiement

- **`deploy.sh`** - Déploiement du site web Borealytics
- **`deploy-erp.sh`** - Déploiement de l'ERP (Docker)
- **`deploy-mermaid.sh`** - Déploiement de l'application Mermaid (Docker)

### Scripts de backup

- **`backup-postgres.sh`** - Backup automatique de PostgreSQL
- **`restore-postgres.sh`** - Restauration d'un backup PostgreSQL

## 🚀 Utilisation

### Sur le serveur

1. **Copier les configurations Nginx** :
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/borealytics
   sudo cp nginx-erp.conf /etc/nginx/sites-available/erp
   sudo cp nginx-mermaid.conf /etc/nginx/sites-available/mermaid
   ```

2. **Copier les Docker Compose** dans les répertoires appropriés :
   ```bash
   cp docker-compose.erp.yml /opt/apps/erp/docker-compose.yml
   cp docker-compose.mermaid.yml /opt/apps/mermaid/docker-compose.yml
   ```

3. **Copier les scripts de déploiement** :
   ```bash
   sudo mkdir -p /opt/scripts
   sudo cp deploy*.sh backup*.sh restore*.sh /opt/scripts/
   sudo chmod +x /opt/scripts/*.sh
   ```

### Déployer une application

```bash
# Site web
/opt/scripts/deploy.sh

# ERP
/opt/scripts/deploy-erp.sh

# Mermaid
/opt/scripts/deploy-mermaid.sh
```

### Backup PostgreSQL

```bash
# Backup manuel
/opt/scripts/backup-postgres.sh

# Restaurer un backup
/opt/scripts/restore-postgres.sh /opt/backups/postgres/erp_backup_20250101_120000.sql.gz
```

## 📖 Documentation complète

Consultez **`multi_app_deployment.md`** pour le guide complet de déploiement étape par étape.
