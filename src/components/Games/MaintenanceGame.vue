<script lang="ts">
import { PropType, ref } from 'vue'
import { defineComponent } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import type { ChoixType } from '@/components/Games/MaintenanceGame/Choix.vue'
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue'
import Meteorite from '@/components/Games/MaintenanceGame/Meteorite.vue'
import Messages, { MessageType } from '@/components/Games/MaintenanceGame/Messages.vue'
import Choix from '@/components/Games/MaintenanceGame/Choix.vue'

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
  created() {

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
            content: 'Mdazdzadzadazdazonctionne pas',
            isImage: false,
            isMine: true,
          },
          {
            content: 'meteorite.png',
            isImage: true,
            isMine: false,
          },
          {
            content: 'Ma souris ne fonctionne pas',
            isImage: false,
            isMine: false,
          },
        ],
        choixList: {
          content: ['bbChoix 1', 'bbChoix 2', 'bbChoix 3'],
          goodChoice: 2
        },
      },
      {
        messagesList: [
          {
            content: 'En quoi puis-je vous aider ?',
            isImage: false,
            isMine: true,
          },
          {
            content: 'Merci j\'ai besoin d\'aide',
            isImage: false,
            isMine: false,
          },
          {
            content: 'Bonjour je vais vous aider',
            isImage: false,
            isMine: true,
          },
        ],
        choixList: {
          content: ['1', '2', '3'],
          goodChoice: 0
        }
      },
    ]
    const etapeIndex = ref(0)
    const messageList = ref<MessageType[]>([])
    const cpt = ref(0)
    ajouterNouveauMessages()

    const modaleOpen = ref(false)

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
        }
        else {
          cpt.value = 0
          clearInterval(interval)
        }
      }, 1000)
    }
    const countdownEnd = (): void => {
      // eslint-disable-next-line no-console
      console.log('fin')
    }
    function handleSkipGame(): void {
      emit('skipGame')
    }
    function handleQuitGame(): void {
      emit('quitGame')
    }
    function toggleModaleBadAnswer(): void {
      modaleOpen.value = !modaleOpen.value
      console.log(modaleOpen.value)
    }

    return {
      etapeIndex,
      histoire,
      messageList,
      modaleOpen,
      toggleModaleBadAnswer,
      handleCountdown,
      handleSkipGame,
      handleQuitGame,
      handleChoix,
      countdownEnd,
    }
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
      <div class="intermediateHeader">
        <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
          Île {{ islandInfos.islandName }}
        </IslandTitle>
        <PauseMenu :color="islandInfos.color" @skip="handleSkipGame()" @quit="handleQuitGame()" />
        <p class="instructionTitle">
          Aide rapidement l'habitant !
        </p>
        <Meteorite />
      </div>
    </template>
    <template #content>
      <Messages :messages="messageList" @countdown-end="countdownEnd" />
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
