<template>
  <button class="dt-island__title" :class="{ '-checked': checked }">
    <span class="icon-done"></span>
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'island-title',
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
