<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import cybersecurite from '@/assets/data/cybersecurite.json'
import devLogiciel from '@/assets/data/dev_logiciel.json'
import FindTheWayOut from '@/components/Games/FindTheWayOut.vue'
import GamePresentation from '@/components/Games/GamePresentation/GamePresentation.vue'
import IA from '@/assets/data/IA.json'
import type { Island } from '@/Model/Island/Island'
import { IslandName } from '@/Model/Island/Island'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import { IslandStatus } from '@/Model/GameStatus'
import maintenance from '@/assets/data/maintenance.json'
import NumberLink from '@/components/Games/NumberLink.vue'
import reseaux from '@/assets/data/reseaux.json'
import Results from '@/components/Islands/Results.vue'
import robotique from '@/assets/data/robotique.json'
import useGameStore from '@/stores/game'
import WinScreen from '@/components/Islands/WinScreen.vue'
import PasswordCracker from "@/components/Games/PasswordCracker.vue";

export default defineComponent({
  name: 'IslandView',
  components: {
    FindTheWayOut,
    PasswordCracker,
    GamePresentation,
    NumberLink,
    Results,
    WinScreen,
  },
  props: {
    island: {
      type: Object as PropType<Island>,
      required: true,
    },
  },
  emits: ['backToMap'],
  events: { backToMap: () => null },
  setup(props, { emit }) {
    const step = ref<number>(0)

    const gameStore = useGameStore()
    const islandInfos = reactive<IslandInfo>({} as IslandInfo)

    function handleStartGame(): void {
      if (islandInfos.hasGame) {
        step.value = 1
      }
      else if (props.island.status === IslandStatus.COMPLETE) {
        step.value = 3
      }
      else {
        gameStore.setIslandStatus(props.island.name, IslandStatus.COMPLETE)
        step.value = 2
      }
    }

    function handleEndGame(): void {
      if (props.island.status === IslandStatus.COMPLETE) {
        step.value = 3
      }
      else {
        gameStore.setIslandStatus(props.island.name, IslandStatus.COMPLETE)
        step.value = 2
      }
    }

    function handleBackToMap(): void {
      emit('backToMap')
    }

    function handleSkipGame(): void {
      if (props.island.status === IslandStatus.OPENED)
        gameStore.setIslandStatus(props.island.name, IslandStatus.DISCOVERED)

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
      if (props.island.status === IslandStatus.NOT_DISCOVERED)
        gameStore.setIslandStatus(props.island.name, IslandStatus.OPENED)

      Object.assign(islandInfos, getIslandInfos(props.island.name))
    })

    return {
      step,
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
  <FindTheWayOut
    v-if="step === 1 && islandInfos.islandName === 'Logicias'"
    @skipGame="handleSkipGame()"
    @quitGame="handleBackToMap()"
    @endGame="handleEndGame()"
  />
  <NumberLink
    v-if="step === 1 && islandInfos.islandName === 'Nethosa'"
    @skipGame="handleSkipGame()"
    @quitGame="handleBackToMap()"
    @endGame="handleEndGame()"
  />
  <PasswordCracker
    v-if="step === 1 && islandInfos.islandName === 'Segura'"
    @skipGame="handleSkipGame()"
    @quitGame="handleBackToMap()"
    @endGame="handleEndGame()"
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
