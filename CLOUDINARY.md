# Configuration Cloudinary

## 1. Créer un compte Cloudinary

1. Aller sur [cloudinary.com](https://cloudinary.com)
2. Créer un compte gratuit (Free tier : 25GB bandwidth, 25GB storage)
3. Récupérer les credentials

## 2. Configurer les credentials

Copier `.env.example` vers `.env` et remplir :

```bash
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

Ces infos sont dans le Dashboard Cloudinary (Dashboard > API Credentials)

## 3. Installer les dépendances

```bash
npm install
```

## 4. Uploader les médias

```bash
npm run upload:media
```

Cela va :
- Uploader **photos et vidéos** vers Cloudinary
- Générer un fichier `data/media-urls.json` avec toutes les URLs
- Appliquer compression automatique

## 5. URLs optimisées

### Photos
```
https://res.cloudinary.com/<cloud>/image/upload/w_1200,q_auto,f_auto/malaisie/kuala-lumpur/IMG_8012
```

Paramètres :
- `w_1200` : largeur max
- `q_auto` : qualité automatique
- `f_auto` : format automatique (WebP/AVIF)

### Vidéos
```
https://res.cloudinary.com/<cloud>/video/upload/w_1280,q_auto,f_auto/malaisie/tioman/A001_08121811_C001
```

Thumbnail vidéo :
```
https://res.cloudinary.com/<cloud>/video/upload/w_640,h_360,c_fill,so_auto.jpg
```

## Commandes

| Commande | Description |
|----------|-------------|
| `npm run upload:media` | Upload photos + vidéos |
| `npm run media:list` | Liste les médias |

## Structure des données

```json
{
  "photos": {
    "01-kuala-lumpur": [{ "publicId": "...", "url": "..." }],
    ...
  },
  "videos": {
    "01-kuala-lumpur": [{ "publicId": "...", "url": "...", "duration": ... }],
    ...
  }
}
```
