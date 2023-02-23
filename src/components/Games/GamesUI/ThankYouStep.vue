<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'ThankYouStep',
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bubbleText: {
      type: String,
      required: true,
    },
  },
  emits: ['endGame'],
})
</script>

<template>
  <Game :color="islandInfos.color">
    <template #header>
      <div class="dt-ty-header-title">
        <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
          Île {{ islandInfos.islandName }}
        </IslandTitle>
      </div>
    </template>
    <template #content>
      <div class="dt-ty-content">
        <img class="dt-ty-img" :src="imgUrl">
        <p class="dt-ty-name">
          {{ name }}
        </p>
        <div class="dt-ty-bubble">
          {{ bubbleText }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="dt-ty-action-container">
        <DTButton class="dt-ty-button" :color="islandInfos.color" @click="$emit('endGame')">
          Récupérer le cadeau
        </DTButton>
      </div>
    </template>
  </Game>
</template>

<style lang="scss" scoped>
.dt-ty {
  &-content {
    display: flex;
    height: inherit;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-img {
    max-width: 300px;
    width: 60%;
    aspect-ratio: 1;
    border-radius: 50%;
    margin: 10px;
  }

  &-name {
    font-weight: bold;
  }

  &-bubble {
    width: 90%;
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
    box-shadow: 0 0 20px rgb(0 0 0 / 25%);
    animation: showBubble .6s;
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

@keyframes showBubble {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
