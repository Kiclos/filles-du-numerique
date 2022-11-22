<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Game',
  props: {
    color: {
      type: String,
      required: true,
    },
    withoutMargin: {
      type: Boolean,
      required: false,
    },
  },
})
</script>

<template>
  <div class="dt-game" :class="`bg-${color}`">
    <div class="dt-game__header" :class="{ 'dt-game__header-margin': !withoutMargin }">
      <slot name="header" />
    </div>
    <div class="dt-game__content" :class="{ 'dt-game__content-margin': !withoutMargin }">
      <slot name="content" />
    </div>
    <div class="dt-game__footer" :class="{ 'dt-game__footer-margin': !withoutMargin }">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
.dt-game {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  padding: 0 calc((100vw - 500px) / 2);
  padding-top: 2rem;
  z-index: 2;

  &__header, &__content, &__footer {
    width: 100%;
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 2rem;
  }

  &__header-margin {
    padding: 0 2rem;
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: justify;
    color: $white;
    overflow: hidden;
    font-weight: 300;
    line-height: 1.5rem;
    height: 100%;
  }

  &__content-margin {
    padding: 0 2rem;
  }

  &__footer-margin {
    margin: 1rem 2rem 0 2rem;
  }
}
</style>
