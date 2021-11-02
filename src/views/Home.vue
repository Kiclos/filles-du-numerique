<template>
  <div class="dt-p16">
    <Button class="dt-button--default">Commencer le jeu</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';

export default defineComponent({
  components: {
    Button,
  },
});
</script>
