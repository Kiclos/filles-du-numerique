import type { EtapeHistoireType } from '@/components/Games/MaintenanceGame.vue'

export const badMessages: string[] = ['J\'ai essayé mais ça n\'a pas fonctionné !', 'Comment doit-je faire ?']
export const histoire: EtapeHistoireType[] = [
  {
    messagesList: [
      {
        content: 'Bonjour, j\'ai besoin d\'aide avec mon ordinateur !',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Sinon une catastrophe va se produire !',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Calmez vous et expliquez moi votre problème',
        isImage: false,
        isMine: true,
      },
      {
        content: 'Mon ordinateur contrôle et empêche les éruptions du volcan de l\'île',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Cependent depuis ce matin il ne fonctione plus...',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Si je n\'arrive pas a le faire marcher, le volcan va entrer en éruption et des débris risquent de détruie l\'île !',
        isImage: false,
        isMine: false,
      },
    ],
    choixList: {
      content: ['Avez vous essayer de le redémarrer ?', 'Avez vous essayer de taper dessus ?'],
      goodChoice: 0,
    },
  },
  {
    messagesList: [
      {
        content: 'Avez vous essayer de le redémarrer ?',
        isImage: false,
        isMine: true,
      },
      {
        content: 'Oui j\'ai déjà essayé ...',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Voici une photo de mon ordinateur',
        isImage: false,
        isMine: false,
      },
      {
        content: 'meteorite.png',
        isImage: true,
        isMine: false,
      },
    ],
    choixList: {
      content: ['Votre cable est débranché', 'Essayez de mettre votre ordinateur dans du riz'],
      goodChoice: 0,
    },
  },
  {
    messagesList: [
      {
        content: 'Votre cable est débranché',
        isImage: false,
        isMine: true,
      },
      {
        content: 'Oui effectivement ...',
        isImage: false,
        isMine: false,
      },
      {
        content: 'J\'arrive à l\'allumer maintenant !',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Je n\'arrive pas à me connecter à internet maintenant !',
        isImage: false,
        isMine: false,
      },
      {
        content: 'meteorite.png',
        isImage: true,
        isMine: false,
      },
    ],
    choixList: {
      content: ['Essayez d\'éteindre votre écran', 'Vous n\'êtes pas connecté à la wifi, vérifiez le mot de passe'],
      goodChoice: 1,
    },
  },
  {
    messagesList: [
      {
        content: 'Vous n\'êtes pas connecté à la wifi, vérifiez le mot de passe',
        isImage: false,
        isMine: true,
      },
      {
        content: 'Ah oui c\'est vrai j\'avais changé le mot de passe',
        isImage: false,
        isMine: false,
      },
      {
        content: 'J\'ai un nouveau problème maintenant',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Des pubs m\'empêchent d\'utiliser l\'ordinateur !!',
        isImage: false,
        isMine: false,
      },
      {
        content: 'meteorite.png',
        isImage: true,
        isMine: false,
      },
    ],
    choixList: {
      content: ['Installez un antivirus', 'Mettez une etiquette stop pub sur votre ordinateur', 'Achetez les produits des pubs'],
      goodChoice: 0,
    },
  },
  {
    messagesList: [
      {
        content: 'Installez un antivirus',
        isImage: false,
        isMine: true,
      },
      {
        content: 'Merci beaucoup, mon ordinateur fonctionne maintenant',
        isImage: false,
        isMine: false,
      },
      {
        content: 'Vous avez sauver mon île, merci beaucoup !',
        isImage: false,
        isMine: false,
      },
    ],
    choixList: {
      content: ['De rien, bonne journée'],
      goodChoice: 0,
    },
  },
]