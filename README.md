# digitales

## A l'attention des non-développeurs :
Bienvenue !
Pour effectuer des modifications dans les différents textes du jeu, il faudra modifier les fichiers finissant en .json, accessibles depuis les dossiers :
- src
- assets
- data
Ensuite, on modifie les différentes données.
Afin d'ajouter une vidéo en fin de fiche, on ajoute entre les crochets [] les lignes suivantes :
```
, // virgule à n'ajouter que si une autre vidéo est dans les crochets
{
  "title" : "Le nom de la vidéo",
  "url" : "Le lien youtube vers la vidéo"
}
```

## Pour les futurs développeurs :
L'application a été réalisée en Vue 3, en utilisant la composition API.
C'est une Progressive Web App, et il manque 4 jeux à développer.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
