<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PauseMenu',
  props: {
    color: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['skip', 'quit'],
  events: {
    skip: () => null,
    quit: () => null,
  },
  setup(_, { emit }) {
    const isOpened = ref<boolean>(false)

    function handleSkip(): void {
      emit('skip')
    }

    function handleQuit(): void {
      emit('quit')
    }

    return {
      isOpened,
      handleSkip,
      handleQuit,
    }
  },
})
</script>

<template>
  <div class="dt-pause" :class="`-${color}`">
    <button class="dt-pause__button" :class="{ '-opened': isOpened }" @click="isOpened = !isOpened">
      <span class="dt-pause__icon">
        <span />
        <span />
      </span>
      {{ isOpened ? 'Fermer' : 'Pause' }}
    </button>
    <transition name="fade">
      <div v-if="isOpened" class="dt-pause__container">
        <h2 class="dt-pause__title">
          Pause
        </h2>
        <DTButton :color="color" @click="isOpened = false">
          Reprendre
        </DTButton>
        <DTButton :color="color" @click="handleSkip()">
          Passer
        </DTButton>
        <DTButton :color="color" @click="handleQuit()">
          Retour à l'écran des îles
        </DTButton>
      </div>
    </transition>
  </div>
</template>
