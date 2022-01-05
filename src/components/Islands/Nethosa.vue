<template>
  <!-- eslint-disable -->
  <g class="dt-nethosa">
    <foreignObject class="dt-island__container" x="80" y="0" width="120px" height="40">
      <island-title :checked="checked">Nethosa</island-title>
    </foreignObject>
  </g>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';

export default defineComponent({
  name: 'Nethosa',
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
