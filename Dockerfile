# Utiliser une image de base officielle de Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install
RUN npm rebuild bcrypt --build-from-source
# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

RUN npx prisma generate

# Démarrer l'application
CMD ["node", "./server.js"]