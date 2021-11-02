<template>
  <div class="dt-p16" style="background: #f6f6f6">
    <Button class="dt-button--default">Commencer le jeu</Button>
    <Button class="dt-button--text">Commencer le jeu</Button>
    <Button class="dt-button--reversed-text">Commencer le jeu</Button>
    <Button class="dt-button--outlined">Commencer le jeu</Button>
    <Button class="dt-button--reversed-outlined">Commencer le jeu</Button>
    <Button class="dt-button--reversed">Commencer le jeu</Button>
    <Button class="dt-button--blue">Commencer le jeu</Button>
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
