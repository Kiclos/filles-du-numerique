<template>
  <div class="dt-win-screen__container" :class="`-${color}`" @click="handleClick()">
    <template v-if="reward.length > 0">
      <h1 class="dt-win-screen__title">Félicitations !</h1>
      <div class="dt-win-screen__icon__container">
        <div class="dt-win-screen__icon__content" :class="`-${reward}`"></div>
      </div>
      <h2 class="dt-win-screen__subtitle">Vous avez obtenu <br>une nouvelle pièce de Rebecca !</h2>
    </template>
    <template v-else>
      <h1 class="dt-win-screen__title">Victoire !</h1>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WinScreen',
  props: {
    color: {
      type: String,
      required: false,
      default: '',
    },
    reward: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['close'],
  events: { close: () => null },
  setup(_, { emit }) {
    function handleClick(): void {
      emit('close');
    }
    return { handleClick };
  },
});
</script>
