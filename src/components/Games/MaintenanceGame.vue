<script lang="ts">
import { onMounted, PropType } from 'vue'
import { defineComponent, nextTick, ref } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import type { ChoixType } from '@/components/Games/MaintenanceGame/Choix.vue'
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue'
import Meteorite from '@/components/Games/MaintenanceGame/Meteorite.vue'
import type { MessageType } from '@/components/Games/MaintenanceGame/Messages.vue'
import Messages from '@/components/Games/MaintenanceGame/Messages.vue'
import Choix from '@/components/Games/MaintenanceGame/Choix.vue'
import { badMessages, histoire } from '@/Model/Game/MaintenanceScenario'

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
  emits: ['restartGame', 'skipGame', 'quitGame', 'endGame'],
  events: {
    restartGame: () => null,
    skipGame: () => null,
    quitGame: () => null,
    endGame: () => null,
  },
  setup(_, { emit }) {
    const countdown = 5
    function handleCountdown(): number {
      return countdown
    }
    const etapeIndex = ref(0)
    const choixList = ref<ChoixType>()
    const choixAvailable = ref(false)
    const messageList = ref<MessageType[]>([])
    const cpt = ref(0)

    const modaleOpen = ref(false)
    const modaleLoseGame = ref(false)

    onMounted(() => {
      ajouterNouveauMessages()
    })

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
        showMessagesBadAnswer(choixNumber)
      }
    }
    async function showMessagesBadAnswer(choixNumber: number) {
      const tmpChoix = choixList.value
      choixList.value = undefined
      choixAvailable.value = false
      await new Promise(resolve => setTimeout(resolve, 1000))
      messageList.value = [{ content: histoire[etapeIndex.value]?.choixList.content[choixNumber], isImage: false, isMine: true }, ...messageList.value]
      await new Promise(resolve => setTimeout(resolve, 1000))
      for (let cpt = 0; cpt < 2; cpt++) {
        messageList.value = [{ content: badMessages[cpt], isImage: false, isMine: false }, ...messageList.value]
        nextTick(() => {
          const messagesBox = document.querySelector('.messagesBox')?.querySelector('p')
          if (!messagesBox)
            return
          messagesBox.scrollIntoView({ behavior: 'smooth' })
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      choixList.value = tmpChoix
      choixAvailable.value = true
      nextTick(() => {
        const lastMessage = document.querySelector('.yourMessage')
        if (!lastMessage)
          return
        lastMessage.scrollIntoView({ behavior: 'smooth' })
      })
    }

    async function ajouterNouveauMessages() {
      const interval = setInterval(() => {
        if (cpt.value < histoire[etapeIndex.value].messagesList.length) {
          messageList.value = [histoire[etapeIndex.value].messagesList[cpt.value], ...messageList.value]
          cpt.value += 1
          nextTick(() => {
            const messagesBox = document.querySelector('.messagesBox')?.querySelector('p')
            if (!messagesBox)
              return
            messagesBox.scrollIntoView({ behavior: 'smooth' })
          })
        }
        else {
          choixList.value = histoire[etapeIndex.value].choixList
          choixAvailable.value = true
          cpt.value = 0
          clearInterval(interval)
          nextTick(() => {
            const lastMessage = document.querySelector('.yourMessage')
            if (!lastMessage)
              return
            lastMessage.scrollIntoView({ behavior: 'smooth' })
          })
        }
      }, 1000)
    }
    const countdownEnd = (): void => {
      modaleLoseGame.value = true
    }
    function handleRestartGame(): void {
      emit('restartGame')
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
      handleRestartGame,
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
          <button @click="handleRestartGame()">
            Recommencer
          </button>
        </div>
      </div>
      <div class="intermediateHeader">
        <div class="header-title">
          <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
            Île {{ islandInfos.islandName }}
          </IslandTitle>
        </div>
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

.header-title {
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
  width: 80%;
  max-width: 300px;
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
