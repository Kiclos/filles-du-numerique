<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import IslandTitle from '@/components/Islands/IslandTitle.vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'GameResults',
  components: { IslandTitle },
  props: {
    content: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  emits: ['startGame', 'backToMap', 'skipGame'],
  events: {
    startGame: () => null,
    backToMap: () => null,
    skipGame: () => null,
  },
  setup(props, { emit }) {
    const getButtonText = computed(() => {
      if (props.content.hasGame)
        return 'Commencer le jeu'

      if (props.status === 3)
        return 'Consulter la ficher métier'

      return 'Collecter la pièce'
    })

    function handleStartGame(): void {
      emit('startGame')
    }

    function handleBackTopMap(): void {
      emit('backToMap')
    }

    function handleSkipGame(): void {
      emit('skipGame')
    }

    return {
      getButtonText,
      handleStartGame,
      handleBackTopMap,
      handleSkipGame,
    }
  },
})
</script>

<template>
  <div class="dt-game-presentation" :class="`-${content.color}`">
    <div class="dt-game-presentation__header">
      <button class="dt-game-presentation__header__back-button" @click="handleBackTopMap()">
        <span class="icon-arrow_back" aria-label="Retour à la carte" />
      </button>
      <button class="dt-game-presentation__header__skip-button" @click="handleSkipGame()">
        Passer <br>le mini jeu <span class="icon-skip_next" />
      </button>
    </div>
    <div class="dt-game-presentation__content">
      <div class="dt-game-presentation__content__island-icon" :aria-label="content.img" />
      <IslandTitle :checked="status > 1">
        Île {{ content.islandName }}
      </IslandTitle>
      <p class="dt-game-presentation__content__text">
        {{ content.presentation }}<br><br>
        {{ content.guideline }}
      </p>
    </div>
    <div class="dt-game-presentation__footer">
      <button class="dt-button" :class="`-${content.color}`" @click="handleStartGame()">
        {{ getButtonText }}
      </button>
    </div>
  </div>
</template>
