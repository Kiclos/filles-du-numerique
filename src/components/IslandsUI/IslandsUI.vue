<template>
  <div class="dt-islands-ui__counter">
    <span class="dt-islands-ui__counter__icon"></span>
    {{ itemCollectedSize }}/6
  </div>
  <div class="dt-islands-ui__dialog">
    <span class="dt-islands-ui__dialog__icon"></span>
    <text-container class="dt-textcontainer--neutral">
      <template v-if="itemCollectedSize === 0">Merci d'accepter de m'aider !<br> Alors, par où allons-nous commencer ?</template>
      <template v-if="itemCollectedSize === 1">Et une pièce de récupérée ! À la suivante !</template>
      <template v-if="itemCollectedSize === 2">Et de deux ! Je me sens déjà mieux ! À ce rythme je serais reconstruite en un éclair !</template>
      <template v-if="itemCollectedSize === 3">Et un demi robot de reconstuit ! Nous sommes à mi-chemin !</template>
      <template v-if="itemCollectedSize === 4">Quelle aventure ! Même démantelée, je m'amuse beaucoup !</template>
      <template v-if="itemCollectedSize === 5">C'est la dernière ligne droite ! Plus qu'une !</template>
      <template v-if="itemCollectedSize === 6">Quel île veux-tu visiter aujourd'hui ?</template>
    </text-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';
import useGameStore from '@/stores/game';
import { IslandStatus } from '@/Model/GameStatus';

export default defineComponent({
  name: 'IslandsUI',
  components: { TextContainer },
  setup() {
    const gameStore = useGameStore();
    const itemCollectedSize: number = gameStore.islands.filter((x) => x.status === IslandStatus.COMPLETE).length;

    return { itemCollectedSize };
  },
});
</script>
