<template>
  <!-- eslint-disable-->
  <g class="dt-logicas">
    <foreignObject class="dt-island__container" x="260" y="350" width="120px" height="40">
      <island-title :checked="checked">Logicas</island-title>
    </foreignObject>
  </g>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';

export default defineComponent({
  name: 'Logicas',
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
