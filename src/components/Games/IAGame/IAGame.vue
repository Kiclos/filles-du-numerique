<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import IAGameTrainingStep from '@/components/Games/IAGame/IAGameTrainingStep.vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'IAGame',
  components: { IAGameTrainingStep },
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['skipGame', 'quitGame', 'endGame'],
  setup(_, { emit }) {
    const currentStep = ref(1)

    function nextStep(): void {
      currentStep.value += 1
    }

    function handleSkipGame(): void {
      emit('skipGame')
    }

    function handleQuitGame(): void {
      emit('quitGame')
    }

    function handleEndGame(): void {
      emit('endGame')
    }

    return {
      handleSkipGame,
      handleQuitGame,
      nextStep,
      currentStep,
      handleEndGame,
    }
  },
})
</script>

<template>
  <PauseMenu :color="islandInfos.color" @skip="handleSkipGame()" @quit="handleQuitGame()" />
  <IAGameTrainingStep v-if="currentStep === 1" :island-infos="islandInfos" @next-step="nextStep()" />
  <IAGameResultStep v-if="currentStep === 2" :island-infos="islandInfos" @end-game="handleEndGame()" />
</template>

<style lang="scss">

</style>
