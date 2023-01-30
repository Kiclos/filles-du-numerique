<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'RoboticGame',
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['skipGame', 'quitGame', 'endGame'],
  setup() {
    const currentStep = ref(1)

    function nextStep(): void {
      currentStep.value += 1
    }

    return {
      nextStep,
      currentStep,
    }
  },
})
</script>

<template>
  <PauseMenu :color="islandInfos.color" @skip="$emit('skipGame')" @quit="$emit('quitGame')" />
  <RoboticGameStep v-if="currentStep === 1" :island-infos="islandInfos" @next-step="nextStep()" />
  <ThankYouStep
    v-else-if="currentStep === 2"
    :island-infos="islandInfos"
    img-url="/img/RoboticGame/pauline.png"
    bubble-text="Merci de m'avoir guidé ! Pour te remercier, voici un objet que j'ai trouvé dans le labyrinthe."
    @end-game="$emit('endGame')"
  />
</template>

<style lang="scss">

</style>
