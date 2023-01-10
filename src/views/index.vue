<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import useGameStore from '@/stores/game'
import dialogData from '@/assets/data/storyline.json'

import type { Island } from '@/Model/Island/Island'
import { GameStatus, IslandStatus } from '@/Model/GameStatus'

export default defineComponent({
  name: 'App',

  setup() {
    const gameStore = useGameStore()

    const welcomeIsOpened = ref<boolean>(true)
    const mapIsOpened = ref<boolean>(false)
    const dialogIsOpened = ref<boolean>(false)
    const resultIsOpened = ref<boolean>(false)
    const islandViewIsOpened = ref<boolean>(false)
    const dialogs = reactive({
      current: dialogData.dialogs.intro,
      ...dialogData.dialogs,
    })

    const currentIsland: Island = reactive<Island>({} as Island)

    function handleGameStart(): void {
      welcomeIsOpened.value = false
      if (gameStore.status === GameStatus.INIITAL_STATE)
        dialogIsOpened.value = true
      else
        mapIsOpened.value = true
    }

    function handleIslandSelection(island: Island): void {
      Object.assign(currentIsland, island)
      islandViewIsOpened.value = true
    }

    function handleDialogClose(): void {
      switch (gameStore.status) {
        case GameStatus.INIITAL_STATE:
          gameStore.setGameStatus(GameStatus.POST_INTRO)
          dialogIsOpened.value = false
          setTimeout(() => {
            // Object.assign(dialogs, dialogData.dialogs.meeting);
            dialogs.current = JSON.parse(JSON.stringify(dialogs.meeting))
            dialogIsOpened.value = true
          })
          break
        case GameStatus.POST_INTRO:
          dialogIsOpened.value = false
          mapIsOpened.value = true
          break
        case GameStatus.ALL_GAMES_COMPLETE:
          gameStore.setGameStatus(GameStatus.POST_OUTRO)
          dialogIsOpened.value = false
          setTimeout(() => {
            // Object.assign(dialogs, dialogData.dialogs.ending);
            dialogs.current = JSON.parse(JSON.stringify(dialogs.ending))
            dialogIsOpened.value = true
          })
          break
        case GameStatus.POST_OUTRO:
          dialogIsOpened.value = false
          welcomeIsOpened.value = true
          break
        default:
          break
      }
    }

    function handleBackToMap(): void {
      islandViewIsOpened.value = false
      const nbPieces = gameStore.islands.filter(
        x => x.status === IslandStatus.COMPLETE,
      ).length
      if (nbPieces === 6 && gameStore.status === GameStatus.POST_INTRO) {
        gameStore.setGameStatus(GameStatus.ALL_GAMES_COMPLETE)
        // Object.assign(dialogs, dialogData.dialogs.separation);
        dialogs.current = JSON.parse(JSON.stringify(dialogs.separation))
        dialogIsOpened.value = true
        mapIsOpened.value = false
      }
    }

    function getJavascriptViewPort(): void {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    onMounted(() => {
      getJavascriptViewPort()
      window.addEventListener('resize', () => {
        getJavascriptViewPort()
      })
      const gameStatus = localStorage.getItem('gameStatus')
      if (gameStatus !== null)
        gameStore.setGameStatus(JSON.parse(gameStatus))

      const islands = localStorage.getItem('islands')
      if (islands !== null) {
        JSON.parse(islands).forEach((island: Island) => {
          gameStore.setIslandStatus(island.name, island.status)
        })
      }
    })

    return {
      currentIsland,
      welcomeIsOpened,
      mapIsOpened,
      dialogIsOpened,
      resultIsOpened,
      islandViewIsOpened,
      dialogs,
      gameStore,
      handleGameStart,
      handleIslandSelection,
      handleDialogClose,
      handleBackToMap,
    }
  },
})
</script>

<template>
  <!--
  <transition name="zoom-fade">
    <DialogView
      v-if="dialogIsOpened"
      :dialogs="dialogs.current"
      @close="handleDialogClose()"
    />
  </transition>
  <transition name="zoom-fade">
    <IslandView
      v-if="islandViewIsOpened"
      :island="currentIsland"
      @backToMap="handleBackToMap()"
    />
  </transition>
  -->
  <Welcome v-if="welcomeIsOpened" @play="handleGameStart()" />
  <!--
  <IslandsView
    v-if="mapIsOpened"
    @selectIsland="handleIslandSelection($event)"
  />
  -->
</template>
