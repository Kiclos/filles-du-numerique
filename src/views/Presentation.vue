<template>
  <div class="dt-p16">
    <button>back</button>
    <button>passer le mini jeu</button>
    <img class="dt-p12" src="@/assets/circle.png" alt="">
    <h2>Île Robotix</h2>
    <p>Sur cette île... Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Soluta, explicabo. Beatae labore ducimus corporis autem atque itaque dolor in quidooem
      veniam, voluptatum libero unde saepe delectus fugiat enim consectetur expedita!</p>
    <Button class="dt-button--blue">Commencer</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';

export default defineComponent({
  name: 'game-results',

  components: {
    Button,
  },
});
</script>
