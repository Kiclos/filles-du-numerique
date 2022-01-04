<template>
  <div class="dt-p16" style="text-align: center">
    <img class="dt-img-w75 m64" src="@/assets/departile.svg" alt="">
    <h1 class="dt-h1">DigitTales</h1>
    <br>
    <Button class="dt-button--default">Jouer</Button>
    <Button class="dt-button--outlined">Crédits</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';

export default defineComponent({
  name: 'welcome',
  components: {
    Button,
  },
});
</script>
