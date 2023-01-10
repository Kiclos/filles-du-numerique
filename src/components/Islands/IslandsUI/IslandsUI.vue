<script lang="ts">
import { computed, defineComponent } from 'vue'
import TextContainer from '@/components/TextContainer/TextContainer.vue'
import useGameStore from '@/stores/game'
import { IslandStatus } from '@/Model/GameStatus'

export default defineComponent({
  name: 'IslandsUI',
  components: { TextContainer },
  setup() {
    const gameStore = useGameStore()
    const itemCollectedSize = computed(() => gameStore.islands.filter(x => x.status === IslandStatus.COMPLETE).length)

    return { itemCollectedSize }
  },
})
</script>

<template>
  <div class="dt-islands-ui__counter">
    <span class="dt-islands-ui__counter__icon" />
    {{ itemCollectedSize }}/6
  </div>
  <div class="dt-islands-ui__dialog">
    <span class="dt-islands-ui__dialog__icon" />
    <TextContainer class="dt-textcontainer -neutral">
      <template v-if="itemCollectedSize === 0">
        Merci d'accepter de m'aider !<br> Alors, par où allons-nous commencer ?
      </template>
      <template v-if="itemCollectedSize === 1">
        Et une pièce de récupérée ! À la suivante !
      </template>
      <template v-if="itemCollectedSize === 2">
        Et de deux ! Je me sens déjà mieux ! À ce rythme je serais reconstruite en un éclair !
      </template>
      <template v-if="itemCollectedSize === 3">
        Et un demi robot de reconstruit ! Nous sommes à mi-chemin !
      </template>
      <template v-if="itemCollectedSize === 4">
        Quelle aventure ! Même démantelée, je m'amuse beaucoup !
      </template>
      <template v-if="itemCollectedSize === 5">
        C'est la dernière ligne droite ! Plus qu'une !
      </template>
      <template v-if="itemCollectedSize === 6">
        Quelle île veux-tu visiter aujourd'hui ?
      </template>
    </TextContainer>
  </div>
</template>

<style lang="scss">
.dt-islands-ui {
  &__counter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 3rem;
    right: 0;
    padding: .25rem 1rem .25rem .25rem;
    background: $white;
    border-radius: 1.25rem 0 0 1.25rem;
    font-size: 1.25rem;
    font-weight: bold;
    color: $orange;
    box-shadow: 0 2px 4px rgba($black, .25);
    animation: slide-in-counter .3s forwards;
    transform: translateX(100%);
    z-index: 1;
    transition: .3s;

    &__icon {
      display: inline-block;
      height: 2rem;
      width: 2rem;
      margin-right: .75rem;
      background: url("../../../assets/img/Rebecca.png") no-repeat .05rem -.65rem;
      background-size: 100%;
      border-radius: 1rem;
    }
  }

  &__dialog {
    position: absolute;
    bottom: 1.5rem;
    padding: 0 1rem;
    max-width: 450px;
    transform: translateY(120%);
    animation: forwards slide-in-dialog .3s;
    pointer-events: none;
    transition: .3s;
    z-index: 1;

    .dt-textcontainer {
      width: 100%;
    }

    &__icon {
      display: inline-block;
      height: 5rem;
      width: 5rem;
      margin-bottom: .25rem;
      background: url("../../../assets/img/Rebecca.png") no-repeat center -1.5rem;
      background-size: 100%;
      border: 2px solid $light-grey;
      border-radius: 2.5rem;
    }
  }
}

@keyframes slide-in-dialog {
  from { transform: translateY(120%); }
  to { transform: translateY(0); }
}

@keyframes slide-in-counter {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>
