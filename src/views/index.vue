<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { event } from 'vue-gtag'
import useGameStore from '@/stores/game'

import type { Island } from '@/Model/Island/Island'
import { GameStatus } from '@/Model/GameStatus'

export default defineComponent({
  name: 'App',

  setup() {
    const gameStore = useGameStore()

    const router = useRouter()

    function handleGameStart(): void {
      if (gameStore.status === GameStatus.INITIAL_STATE)
        router.push('/introduction')
      else
        router.push('/islands')
    }

    onMounted(() => {
      event('acces_au_site')
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
