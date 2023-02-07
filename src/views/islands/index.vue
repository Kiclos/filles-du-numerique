<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { GameStatus, IslandStatus } from '@/Model/GameStatus'
import useGameStore from '@/stores/game'
import IslandsUI from '@/components/Islands/IslandsUI/IslandsUI.vue'
import type { Island } from '@/Model/Island/Island'

export default defineComponent({
  name: 'IslandsView',
  components: {
    IslandsUI,
  },
  emits: ['selectIsland'],
  events: { selectIsland: (island: Island) => island },
  setup() {
    const gameStore = useGameStore()
    const router = useRouter()

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

      const nbPieces = gameStore.islands.filter(
        x => x.status === IslandStatus.COMPLETE,
      ).length
      if (nbPieces === 6 && gameStore.status === GameStatus.POST_INTRO) {
        gameStore.setGameStatus(GameStatus.ALL_GAMES_COMPLETE)
        router.push('/end')
      }
    })
  },
})
</script>

<template>
  <IslandsUI />
  <IslandsItems />
</template>
