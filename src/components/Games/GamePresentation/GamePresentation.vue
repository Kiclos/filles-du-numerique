<template>
  <div class="dt-game-presentation" :class="`-${content.color}`">
    <div class="dt-game-presentation__header">
      <button class="dt-game-presentation__header__back-button" @click="handleBackTopMap()">
        <span class="icon-arrow_back" aria-label="Retour à la carte"></span>
      </button>
      <button class="dt-game-presentation__header__skip-button" @click="handleSkipGame()">
        Passer <br>le mini jeu <span class="icon-skip_next"></span>
      </button>
    </div>
    <div class="dt-game-presentation__content">
      <div class="dt-game-presentation__content__island-icon" :aria-label="content.img"></div>
      <IslandTitle :checked="status > 1">Île {{ content.islandName }}</IslandTitle>
      <p class="dt-game-presentation__content__text">
        {{ content.presentation }}<br><br>
        {{ content.guideline }}
      </p>
    </div>
    <div class="dt-game-presentation__footer">
      <button class="dt-button" :class="`-${content.color}`" @click="handleStartGame()">
        {{ content.hasGame ? 'Commencer' : 'Collecter la pièce' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';
import { IslandInfo } from '@/Model/Island/IslandInfo';

export default defineComponent({
  name: 'game-results',
  props: {
    content: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  components: { IslandTitle },
  emits: ['startGame', 'backToMap', 'skipGame'],
  events: {
    startGame: () => null,
    backToMap: () => null,
    skipGame: () => null,
  },
  setup(_, { emit }) {
    function handleStartGame(): void {
      emit('startGame');
    }

    function handleBackTopMap(): void {
      emit('backToMap');
    }

    function handleSkipGame(): void {
      emit('skipGame');
    }

    return {
      handleStartGame,
      handleBackTopMap,
      handleSkipGame,
    };
  },
});
</script>
