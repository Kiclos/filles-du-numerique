<template>
  <div class="dt-presentation-bg dt-p16 dt-h100">
    <header class="dt-presentation-header">
      <i class="fas fa-arrow-left"></i>

      <img src="https://img.icons8.com/ios-filled/50/000000/left.png"/>
      <button>passer le mini jeu</button>
    </header>
    <img class="dt-img-w100" src="@/assets/circle.png" alt="">
    <h2>Île Robotix</h2>
    <p>Sur cette île... Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Soluta, explicabo. Beatae labore ducimus corporis autem atque itaque dolor in quidooem
      veniam, voluptatum libero unde saepe delectus fugiat enim consectetur expedita!</p>
    <footer class="dt-presentation-footer">
      <Button class="dt-button--blue">Commencer</Button>
    </footer>
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

<style scoped>

* {
  color: #fff;
}

h2 {
  color: #4fb9d4;
  background: white;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  text-align: center;
  border-radius: 5px;
}

</style>
