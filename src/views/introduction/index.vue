<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { event } from 'vue-gtag';
import { useRouter } from 'vue-router'
import { GameStatus } from '@/Model/GameStatus'
import useGameStore from '@/stores/game'
import dialogData from '@/assets/data/storyline.json'

export default defineComponent({
  name: 'DialogComponent',
  components: {
  },
  setup() {
    const dialogs = dialogData.dialogs.intro
    const router = useRouter()
    const gameStore = useGameStore()

    function close(): void {
      gameStore.setGameStatus(GameStatus.POST_INTRO)
      router.push('/islands')
    }

    onMounted(() => {
      event('debut_scenario')
    })

    return {
      dialogs,
      close,
    }
  },
})
</script>

<template>
  <Dialog :dialogs="dialogs" @close="close()" />
</template>

<style lang="scss">
</style>
