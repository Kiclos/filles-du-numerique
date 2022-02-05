<template>
  <div class="dt-number-link__content">
    <PauseMenu color="green"/>
    find the way out
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PauseMenu from '@/components/GamesUI/PauseMenu/PauseMenu.vue';

export default defineComponent({
  name: 'NumberLink',
  components: { PauseMenu },
  events: { endGame: () => null },
});
</script>
