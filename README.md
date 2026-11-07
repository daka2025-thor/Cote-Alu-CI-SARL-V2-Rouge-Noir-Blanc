# Côté Alu-CI SARL

Site vitrine statique pour présenter les services et réalisations de l'entreprise.

## Pages

- `index.html` : accueil
- `a-propos.html` : présentation
- `services.html` : prestations
- `realisations.html` : vidéos des réalisations
- `contact.html` : coordonnées, carte et demande de devis par WhatsApp

Les photos se trouvent dans `Images/`, les vidéos dans `Videos/` et leurs vignettes dans `Videos/posters/`.

## Sécurité au déploiement

Les pages appliquent une politique de sécurité de contenu et une politique de référent. Le fichier `_headers` convient à Netlify et Cloudflare Pages ; `.htaccess` configure les en-têtes sur Apache. Si l'hébergeur ne prend pas en charge l'un de ces formats, configurez les mêmes en-têtes dans son panneau de contrôle. Le site doit être servi en HTTPS.

Le formulaire de contact ouvre WhatsApp dans le navigateur du visiteur ; le site ne stocke pas les demandes sur un serveur.
