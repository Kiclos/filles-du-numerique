<template>
  <div class="dt-pause" :class="`-${color}`">
    <button class="dt-pause__button" :class="{ '-opened': isOpened }" @click="isOpened = !isOpened">
    <span class="dt-pause__icon">
      <span></span>
      <span></span>
    </span>
      {{ isOpened ? 'Fermer' : 'Pause' }}
    </button>
    <transition name="fade">
      <div class="dt-pause__container" v-if="isOpened">
        <h2 class="dt-pause__title">Pause</h2>
        <button class="dt-button" :class="`-${color}`" @click="isOpened = false">Reprendre</button>
        <button class="dt-button" :class="`-${color}`" @click="handleSkip()">Passer</button>
        <button class="dt-button" :class="`-${color}`" @click="handleQuit()">Retour à l'écran des îles</button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PauseMenu',
  props: {
    color: {
      type: String,
      required: false,
      default: '',
    },
  },
  events: {
    skip: () => null,
    quit: () => null,
  },
  setup(_, { emit }) {
    const isOpened = ref<boolean>(false);

    function handleSkip(): void {
      emit('skip');
    }

    function handleQuit(): void {
      emit('quit');
    }

    return {
      isOpened,
      handleSkip,
      handleQuit,
    };
  },
});
</script>
