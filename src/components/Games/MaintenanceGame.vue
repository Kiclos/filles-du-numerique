<script lang="ts">
import { PropType, ref } from 'vue'
import { defineComponent } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import type { ChoixType } from '@/components/Games/MaintenanceGame/Choix.vue'
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue'
import Meteorite from '@/components/Games/MaintenanceGame/Meteorite.vue'
import Messages, { MessageType } from '@/components/Games/MaintenanceGame/Messages.vue'
import Choix from '@/components/Games/MaintenanceGame/Choix.vue'
import { connect } from 'http2'

export interface EtapeHistoireType {
  messagesList: MessageType[],
  choixList: ChoixType
}

export default defineComponent({
  name: 'MaintenanceGame',
  components: { PauseMenu, Meteorite, Messages, Choix },
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['skipGame', 'quitGame', 'endGame'],
  events: {
    skipGame: () => null,
    quitGame: () => null,
    endGame: () => null,
  },
  setup(_, { emit }) {
    const countdown = 5
    function handleCountdown(): number {
      return countdown
    }
    const histoire: EtapeHistoireType[] = [
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
          goodChoice: 0
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
          goodChoice: 0
        }
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
          goodChoice: 1
        }
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
          goodChoice: 0
        }
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
          goodChoice: 0
        }
      },
    ]
    const etapeIndex = ref(0)
    const messageList = ref<MessageType[]>([])
    const cpt = ref(0)
    ajouterNouveauMessages()

    const modaleOpen = ref(false)
    const modaleLoseGame = ref(false)

    const handleChoix = (choixNumber: number): void => {
      if (histoire[etapeIndex.value]?.choixList.goodChoice === choixNumber) {
        if (etapeIndex.value + 1 < histoire.length) {
          etapeIndex.value += 1
          ajouterNouveauMessages()
        }
        else {
          emit('endGame')
        }
      }
      else {
        toggleModaleBadAnswer()
      }
    }
    // Appeler aussi au ref de messageList
    async function ajouterNouveauMessages() {
      const interval = setInterval(() => {
        if (cpt.value < histoire[etapeIndex.value].messagesList.length) {
          messageList.value = [histoire[etapeIndex.value].messagesList[cpt.value], ...messageList.value]
          cpt.value += 1
          const messagesBox = document.querySelector('.messagesBox')
          if (!messagesBox)
            return
          messagesBox.scrollTop = messagesBox.scrollHeight
        }
        else {
          cpt.value = 0
          clearInterval(interval)
        }
      }, 1000)
    }
    const countdownEnd = (): void => {
      modaleLoseGame.value = true
    }
    function handleSkipGame(): void {
      emit('skipGame')
    }
    function handleQuitGame(): void {
      emit('quitGame')
    }
    function toggleModaleBadAnswer(): void {
      modaleOpen.value = !modaleOpen.value
    }

    return {
      etapeIndex,
      histoire,
      messageList,
      modaleOpen,
      modaleLoseGame,
      toggleModaleBadAnswer,
      handleCountdown,
      handleSkipGame,
      handleQuitGame,
      handleChoix,
      countdownEnd,
    }
  },
  created() {

  },
})
</script>

<template>
  <Game v-if="histoire !== undefined && histoire[etapeIndex] !== undefined" :color="islandInfos.color" withoutMargin>
    <template #header>
      <div v-if="modaleOpen" class="modal">
        <div class="modal-content">
          <p>Mauvaise réponse !</p>
          <button @click="toggleModaleBadAnswer">Close</button>
        </div>
      </div>
      <div v-if="modaleLoseGame" class="modal">
        <div class="modal-content">
          <p>Vous avez perdu ...</p>
          <button @click="handleQuitGame()">Recommencer</button>
        </div>
      </div>
      <div class="intermediateHeader">
        <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
          Île {{ islandInfos.islandName }}
        </IslandTitle>
        <PauseMenu :color="islandInfos.color" @skip="handleSkipGame()" @quit="handleQuitGame()" />
        <p class="instructionTitle">
          Aide rapidement l'habitant !
        </p>
        <Meteorite @countdown-end="countdownEnd" />
      </div>
    </template>
    <template #content>
      <Messages :messages="messageList" />
    </template>
    <template #footer>
      <Choix :choix-list="histoire[etapeIndex]?.choixList" @handle-choix="handleChoix" />
    </template>
  </Game>
</template>

<style lang="scss" scoped>
.instructionTitle {
  font-style: normal;
  font-size: 14px;
  text-align: center;

  color: #2F2F2F;
}

.gamePanel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.intermediateHeader {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 -2rem;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 25%;
}
</style>
