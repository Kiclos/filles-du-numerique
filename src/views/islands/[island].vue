<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import cybersecurite from '@/assets/data/cybersecurite.json'
import devLogiciel from '@/assets/data/dev_logiciel.json'
import GamePresentation from '@/components/Games/GamePresentation/GamePresentation.vue'
import IA from '@/assets/data/IA.json'
import type { Island } from '@/Model/Island/Island'
import { IslandName } from '@/Model/Island/Island'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import { IslandStatus } from '@/Model/GameStatus'
import maintenance from '@/assets/data/maintenance.json'
import NetworkGame from '@/components/Games/NetworkGame/NetworkGameStep.vue'
import reseaux from '@/assets/data/reseaux.json'
import Results from '@/components/Islands/Results.vue'
import robotique from '@/assets/data/robotique.json'
import useGameStore from '@/stores/game'
import WinScreen from '@/components/Islands/WinScreen.vue'
import PasswordCracker from '@/components/Games/PasswordCracker.vue'
import RoboticGame from '@/components/Games/RoboticGame/RoboticGame.vue'

export default defineComponent({
  name: 'Island',
  components: {
    PasswordCracker,
    GamePresentation,
    NetworkGame,
    Results,
    WinScreen,
    RoboticGame,
  },
  setup() {
    const step = ref<number>(0)
    const { params } = useRoute()
    const gameStore = useGameStore()
    const router = useRouter()
    const island = gameStore.islands.find(island => island.name === params.island as IslandName) as Island
    if (!island)
      throw new Error('Island not found')
    const islandInfos = reactive<IslandInfo>({} as IslandInfo)

    function handleStartGame(): void {
      if (island.status === IslandStatus.COMPLETE) {
        step.value = 3
      }
      else if (islandInfos.hasGame) {
        step.value = 1
      }
      else {
        gameStore.setIslandStatus(island?.name, IslandStatus.COMPLETE)
        step.value = 2
      }
    }

    function handleEndGame(): void {
      if (island?.status === IslandStatus.COMPLETE) {
        step.value = 3
      }
      else {
        gameStore.setIslandStatus(island?.name, IslandStatus.COMPLETE)
        step.value = 2
      }
    }

    function handleBackToMap(): void {
      router.push('/islands')
    }

    function handleSkipGame(): void {
      if (island.status === IslandStatus.OPENED)
        gameStore.setIslandStatus(island.name, IslandStatus.DISCOVERED)

      step.value = 3
    }

    function getIslandInfos(name: IslandName): IslandInfo {
      switch (name) {
        case IslandName.CARAMBAN:
          return maintenance
        case IslandName.IAIE:
          return IA
        case IslandName.LOGICIAS:
          return devLogiciel
        case IslandName.NETHOSA:
          return reseaux
        case IslandName.ROBOTIX:
          return robotique
        case IslandName.SEGURA:
          return cybersecurite
      }
    }

    onMounted(() => {
      if (island.status === IslandStatus.NOT_DISCOVERED)
        gameStore.setIslandStatus(island.name, IslandStatus.OPENED)

      Object.assign(islandInfos, getIslandInfos(island.name))
    })

    return {
      step,
      island,
      islandInfos,
      handleStartGame,
      handleEndGame,
      handleSkipGame,
      handleBackToMap,
    }
  },
})
</script>

<template>
  <WinScreen
    v-if="step === 2 && islandInfos.islandName" :color="islandInfos.color"
    :reward="islandInfos.reward"
    @close="handleSkipGame()"
  />
  <RoboticGame
    v-if="step === 1 && islandInfos.islandName === 'Robotix'"
    :island-infos="islandInfos"
    @skipGame="handleSkipGame()"
    @quitGame="handleBackToMap()"
    @endGame="handleEndGame()"
  />
  <NetworkGame
    v-if="step === 1 && islandInfos.islandName === 'Nethosa'"
    :island-infos="islandInfos"
    @skipGame="handleSkipGame()"
    @quitGame="handleBackToMap()"
    @endGame="handleEndGame()"
  />
  <PasswordCracker
    v-if="step === 1 && islandInfos.islandName === 'Segura'"
    :island-infos="islandInfos"
    @skipGame="handleSkipGame()"
    @quitGame="handleBackToMap()"
    @endGame="handleEndGame()"
    />
  <IAGame
    v-if="step === 1 && islandInfos.islandName === 'IAïe'"
    :island-infos="islandInfos"
    @skip-game="handleSkipGame()"
    @quit-game="handleBackToMap()"
    @end-game="handleEndGame()"
  />
  <GamePresentation
    v-if="step === 0 && islandInfos.islandName" :color="islandInfos.color" :content="islandInfos"
    :status="island.status"
    @startGame="handleStartGame()"
    @skipGame="handleSkipGame()"
    @backToMap="handleBackToMap()"
  />
  <Results
    v-if="step === 3 && islandInfos.islandName" :job-data="islandInfos"
    :color="islandInfos.color"
    @close="handleBackToMap()"
  />
</template>
