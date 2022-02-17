<template>
  <div class="dt-p16 dt-textcontainer">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({ name: 'TextContainer' });
</script>
