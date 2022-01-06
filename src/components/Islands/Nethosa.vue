<template>
  <!-- eslint-disable -->
  <g class="dt-nethosa">
    <foreignObject class="dt-island__container" x="105" y="0" width="120px" height="100">
      <div class="dt-island__content">
        <div class="dt-island__icon">
          <img src="@/assets/img/icon/planet.png" alt="robot.png">
        </div>
        <island-title :checked="checked">Nethosa</island-title>
      </div>
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
