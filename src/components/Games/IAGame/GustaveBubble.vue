<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GustaveBubble',
  props: {
    error: {
      type: Boolean,
      required: false,
    },
  },
})
</script>

<template>
  <div class="dt-ia-gustave-bubble">
    <img class="dt-ia-gustave" src="@/assets/img/Gustave/gustave_head.png" alt="tête de gustave">
    <div class="dt-ia-bubble" :class="{ 'dt-ia-bubble-error': error }">
      <slot></slot>
      <div class="dt-ia-bubble-left" />
    </div>
  </div>
</template>

<style lang="scss">
.dt-ia {
  &-gustave {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  &-gustave-bubble {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 25px;
  }

  &-bubble {
    height: 100px;
    width: 250px;
    background-color: white;
    position: relative;
    border-radius: 20px;
    margin-left: 30px;
    padding: 20px;
    text-align: initial;
    color: black;
    line-height: initial;
  }

  &-bubble-error {
    color: #dc3838;
    font-weight: bold;
  }

  &-bubble-left {
    width: 0;
    height: 0;
    border-left: 2vh solid transparent;
    border-right: 2vh solid transparent;
    border-top: 10vh solid white;
    position: absolute;
    top: 20px;
    left: -5px;
    transform: rotate(90deg);
    z-index: -1;
  }
}
</style>
