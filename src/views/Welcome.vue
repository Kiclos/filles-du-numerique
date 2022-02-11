<template>
  <div class="dt-home-screen  dt-p16-center dt-h100">
    <img class="dt-img-w75" src="@/assets/departile.svg" alt="">
    <h1 class="dt-h1">DigitTales</h1>
    <br>
    <Button class="dt-button--default" @click="$emit('play')">Jouer</Button>
    <Button class="dt-button--outlined">Crédits</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';

export default defineComponent({
  name: 'welcome',
  components: { Button },
});
</script>
