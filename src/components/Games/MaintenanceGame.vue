<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import type { ChoixType } from '@/components/Games/MaintenanceGame/Choix.vue'
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue'
import Meteorite from '@/components/Games/MaintenanceGame/Meteorite.vue'
import type { MessageType } from '@/components/Games/MaintenanceGame/Messages.vue'
import Messages from '@/components/Games/MaintenanceGame/Messages.vue'
import Choix from '@/components/Games/MaintenanceGame/Choix.vue'
import { histoire } from '@/Model/Game/MaintenanceScenario'

export interface EtapeHistoireType {
  messagesList: MessageType[]
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
    // const histoire: EtapeHistoireType[] =
    const etapeIndex = ref(0)
    const choixList = ref<ChoixType>()
    const choixAvailable = ref(false)
    const messageList = ref<MessageType[]>([])
    const cpt = ref(0)
    ajouterNouveauMessages()

    const modaleOpen = ref(false)
    const modaleLoseGame = ref(false)

    const handleChoix = (choixNumber: number): void => {
      if (histoire[etapeIndex.value]?.choixList.goodChoice === choixNumber) {
        if (etapeIndex.value + 1 < histoire.length) {
          choixList.value = undefined
          choixAvailable.value = false
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
          choixList.value = histoire[etapeIndex.value].choixList
          choixAvailable.value = true
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
      choixList,
      choixAvailable,
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
  <Game v-if="histoire !== undefined && histoire[etapeIndex] !== undefined" :color="islandInfos.color" without-margin>
    <template #header>
      <div v-if="modaleOpen" class="modal">
        <div class="modal-content">
          <p>Mauvaise réponse !</p>
          <button @click="toggleModaleBadAnswer">
            Close
          </button>
        </div>
      </div>
      <div v-if="modaleLoseGame" class="modal">
        <div class="modal-content">
          <p>Vous avez perdu ...</p>
          <button @click="handleQuitGame()">
            Recommencer
          </button>
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
      <Messages :messages="messageList" :choix-available="choixAvailable" />
    </template>
    <template #footer>
      <Choix :choix-list="choixList" :choix-available="choixAvailable" @handle-choix="handleChoix" />
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
  text-align: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 20%;
  border-radius: 8px;
  font-weight: 600;
  font-size: 20px;
}

.modal-content button {
  margin-top: 5px;
  background-color: #FBDA61;
  border-style: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 400;
  margin-top: 18px;
  cursor: pointer;
  font-size: 16px;
}
</style>
