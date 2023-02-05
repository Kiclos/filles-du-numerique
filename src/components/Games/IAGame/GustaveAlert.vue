<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GustaveAlert',
  props: {
    error: {
      type: Boolean,
      required: false,
    },
    withoutAnimation: {
      type: Boolean,
      required: false,
    },
  },
})
</script>

<template>
  <div class="dt-ia-gustave-content">
    <div class="dt-ia-gustave-alert" :class="{ 'dt-ia-gustave-alert-animation': !withoutAnimation }">
      <img class="dt-ia-gustave-image" src="@/assets/img/Gustave/gustave_head.png" alt="tête de gustave">
      <div class="dt-ia-gustave-text" :class="{ 'dt-ia-gustave-text-error': error }">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dt-ia-gustave {
  &-content {
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  &-alert {
    background-color: white;
    border-radius: 8px;
    margin: 10px 10px 0 10px;
    padding: 0 10px;
    text-align: initial;
    color: black;
    line-height: initial;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    box-shadow: 0 0 20px rgb(0 0 0 / 25%);
  }

  &-alert-animation {
    animation: showBubble .4s;
  }

  &-image {
    max-width: 70px;
    width: 20%;
    aspect-ratio: 1;
  }

  &-gustave-text {
    font-size: 1rem;

    @media (max-width: 1024px) { /* TABLET */
      font-size: 0.9rem;
    }

    &-error {
      color: #dc3838;
    }
  }
}

@keyframes showBubble {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
