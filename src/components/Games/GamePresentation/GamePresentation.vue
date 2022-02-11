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
      <IslandTitle>Île {{ content.islandName }}</IslandTitle>
      <p class="dt-game-presentation__content__text">
        {{ content.presentation }}<br><br>
        {{ content.guideline }}
      </p>
    </div>
    <div class="dt-game-presentation__footer">
      <Button class="dt-button" :class="`-${content.color}`" @click="handleStartGame()">Commencer</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from '../../Button/Button.vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';
import { IslandInfo } from '@/Model/Island/IslandInfo';

export default defineComponent({
  name: 'game-results',
  props: {
    content: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  components: {
    Button,
    IslandTitle,
  },
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
      emit('startGame');
    }

    function handleSkipGame(): void {
      emit('startGame');
    }

    return {
      handleStartGame,
      handleBackTopMap,
      handleSkipGame,
    };
  },
});
</script>
