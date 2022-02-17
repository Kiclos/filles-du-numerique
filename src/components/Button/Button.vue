<template>
  <button class="dt-button">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({ name: 'Button' });
</script>
