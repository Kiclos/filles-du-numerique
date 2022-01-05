<template>
  <!-- eslint-disable -->
  <g class="dt-iaie">
    <foreignObject class="dt-island__container" x="260" y="570" width="120px" height="40">
      <island-title :checked="checked">IAïe</island-title>
    </foreignObject>
  </g>
</template>
<script>
import { defineComponent } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';

export default defineComponent({
  name: 'IAie',
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
