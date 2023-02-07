<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useGameStore from '@/stores/game'

import type { Island } from '@/Model/Island/Island'
import { GameStatus } from '@/Model/GameStatus'

export default defineComponent({
  name: 'App',

  setup() {
    const gameStore = useGameStore()

    const router = useRouter()

    function handleGameStart(): void {
      if (gameStore.status === GameStatus.INIITAL_STATE)
        router.push('/introduction')
      else
        router.push('/islands')
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
      handleGameStart,
    }
  },
})
</script>

<template>
  <Welcome @play="handleGameStart()" />
</template>
