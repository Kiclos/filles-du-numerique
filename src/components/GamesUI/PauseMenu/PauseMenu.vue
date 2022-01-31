<template>
  <button class="dt-pause__button" :class="{ '-opened': isOpened }" @click="isOpened = !isOpened">
    <span class="dt-pause__icon">
      <span></span>
      <span></span>
    </span>
    {{ isOpened ? 'Fermer' : 'Pause' }}
  </button>
  <div class="dt-pause__container" v-if="isOpened">
    <p>Reprendre</p>
    <p>Passer</p>
    <p>Quitter</p>
  </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PauseMenu',
  setup() {
    const isOpened = ref<boolean>(false);

    return {
      isOpened,
    };
  },
});
</script>
