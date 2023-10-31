# Projet ECF - Studi Hiver 23/24

Sujet garge 2023/2024 pour l'ecf graduate développeur Fullstack

---

### I. Prérequis :

  - avoir un serveur Apache installé avec Mysql et php avec la possibilitée de créer un hôte virtuel
  - PHP >= 8.2.*, Driver PDO activé, php-cli
  - Nodejs >= 18.17.* <= 21.1.0

---

### I. Installation :

1. Copie du projet : 

 : - Copier le dépôt à l'aide de Git
  
2. Installer la base donnée :

   : Exécuter le fichier app-install.php ```php app-install.php```
     : - configuration du fichier d'environnement
     : - installation de la base de donnée
     : - installation des fixtures
     : - création des comptes utilisateurs

3. Installer le front :

 : - installer angular-cli ```npm install -g @angular/cli```
 : - installer les dépendances ``cd front`` ``npm i``
 : - générer le front ``ng build``

4. Créer le fichier vhost : 

 : - créer un vhost et le faire pointer vers le dossier public `` {chemin-du-projet}/server/public ``
 : ou  
 : - ajouter un fichier {nom du projet}.conf dans le dossier 'sites-available' avec l'exemple ci-dessous
 ```conf
  # Exemple de vhost
  :
  <VirtualHost *:80>
     ServerName "nom-d'hote"
     DocumentRoot {chemin-du-projet}/server/public
  </VirtualHost>
 ```
