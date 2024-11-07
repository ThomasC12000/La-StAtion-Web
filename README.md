# 📡 La Station

<div style="display: flex; align-items: center;">
  <img src="https://github.com/ThomasC12000/La-StAtion-Web/blob/main/public/img/lastation.png?raw=true" alt="Logo du projet" width="50" style="margin-right: 10px;" />
  <span>Bienvenue dans <strong>La Station</strong>, un projet innovant développé avec <a href="https://nextjs.org/">Next.js</a>. Ce guide vous aidera à installer et à configurer le projet sur votre machine locale. Suivez les étapes ci-dessous pour démarrer.</span>
</div

## 🚀 Commencer

### Prérequis

Assurez-vous d'avoir installé Node.js et npm sur votre machine. Vous pouvez les télécharger [ici](https://nodejs.org/).

### Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/ThomasC12000/La-StAtion-Web.git
```

```bash
cd la-station
npm install
# ou
yarn install
```

### Démarrage du serveur de développement

Lancez le serveur de développement avec l'une des commandes suivantes :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

### Modification des pages

Vous pouvez commencer à éditer la page en modifiant \`app/page.js\`. La page se met à jour automatiquement lorsque vous modifiez le fichier.

## 📁 Structure du Projet

Voici la structure des fichiers et dossiers principaux :

```
LA-STATION-WEB/
├── app/
│   ├── admin/
│   ├── api/
│   ├── calendar/
│   ├── components/
│   ├── contact/
│   ├── dashboard/
│   ├── espace-coworking/
│   ├── evenements/
│   ├── stationnautes/
│   ├── unauthorized/
│   └── ...
│
├── lib/
│   ├── mail.js
│   ├── mongodb.js
│   └── ...
│
├── models/
│   ├── calendar.js
│   ├── publicEvents.js
│   ├── secretCode.js
│   ├── user.js
│
├── utils/
│   ├── checkAuth.js
│   ├── secretCode.js
│   └── ...
│
├── .gitignore
├── .eslintrc.json
├── auth.js
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── tsconfig.json
└── README.md
```

- **public/** : Contient les ressources statiques telles que les images.
- **src/components/** : Contient les composants réutilisables de l'application.
- **src/pages/** : Contient les pages de l'application.
- **src/styles/** : Contient les fichiers de styles CSS.

## 📚 En savoir plus

Pour en savoir plus sur Next.js, consultez les ressources suivantes :

- [Documentation Next.js](https://nextjs.org/docs) - Découvrez les fonctionnalités et l'API de Next.js.
- [Apprendre Next.js](https://nextjs.org/learn) - Un tutoriel interactif sur Next.js.

Vous pouvez également consulter le [dépôt GitHub de Next.js](https://github.com/vercel/next.js/) - vos retours et contributions sont les bienvenus !

## 🚀 Déploiement sur Vercel

La manière la plus simple de déployer votre application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js.

Consultez notre [documentation sur le déploiement Next.js](https://nextjs.org/docs/deployment) pour plus de détails.

## 🛠️ Contribuer

Les contributions sont les bienvenues ! Pour signaler un problème ou proposer des améliorations, ouvrez une issue ou une pull request sur le [dépôt GitHub](https://github.com/votre-utilisateur/la-station).

## 📞 Contact

Pour toute question ou support, contactez-nous à [contact@lastation.com](mailto:contact@lastation.com).

Merci d'utiliser **La Station** ! 🚀
