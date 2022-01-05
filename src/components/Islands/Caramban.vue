<template>
  <!-- eslint-disable-->
  <g class="dt-caramban">
    <foreignObject class="dt-island__container" x="50" y="672" width="120px" height="40">
      <island-title :checked="checked">Caramban</island-title>
    </foreignObject>
  </g>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';

export default defineComponent({
  name: 'Caramban',
  components: { IslandTitle },
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
