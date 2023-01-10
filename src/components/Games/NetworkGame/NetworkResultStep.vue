<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'NetworkResultStep',
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['endGame'],
  setup(_, { emit }) {
    function collectGift(): void {
      emit('endGame')
    }

    return {
      collectGift,
    }
  },
})
</script>

<template>
  <Game :color="islandInfos.color">
    <template #header>
      <div class="dt-ng-header-title">
        <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
          Île {{ islandInfos.islandName }}
        </IslandTitle>
      </div>
    </template>
    <template #content>
      <div class="dt-ng-content">
        <img class="dt-ng-julie" src="@/assets/img/Julie/julie_head.png" alt="tête de julie">
        <div class="dt-ng-bubble">
          Merci pour ton aide ! Voici un objet que l'on conservait au CDI pour te remercier.
          <div class="dt-ng-bubble-left" />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="dt-ng-action-container">
        <DTButton class="dt-ng-button" :color="islandInfos.color" @click="collectGift()">
          Récupérer le cadeau
        </DTButton>
      </div>
    </template>
  </Game>
</template>

<style lang="scss" scoped>
.dt-ng {
  &-content {
    display: flex;
    height: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-julie {
    max-width: 300px;
    width: 60%;
    aspect-ratio: 1;
    border-radius: 50%;
    margin: 10px;
  }

  &-bubble {
    width: 80%;
    background-color: white;
    position: relative;
    border-radius: 20px;
    margin-top: 20px;
    padding: 15px;
    text-align: initial;
    color: black;
    line-height: initial;
    display: flex;
    justify-content: center;
  }

  &-bubble-left {
    width: 0;
    height: 0;
    border-left: 2vh solid transparent;
    border-right: 2vh solid transparent;
    border-top: 10vh solid white;
    position: absolute;
    top: -15px;
    transform: rotate(180deg);
    z-index: -1;
  }

  &-header-title {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  &-action-container {
    margin: 0 10px;
  }

  &-button {
    margin-bottom: 1.5rem;
  }
}
</style>
