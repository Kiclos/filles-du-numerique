<template>
  <!-- eslint-disable -->
  <g class="dt-robotix">
    <foreignObject class="dt-island__container" x="31" y="430" width="120px" height="100">
      <div class="dt-island__content">
        <div class="dt-island__icon">
          <img src="@/assets/img/icon/robot.png" alt="robot.png">
        </div>
        <island-title :checked="checked">Robotix</island-title>
      </div>
    </foreignObject>
  </g>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';

export default defineComponent({
  name: 'Robotix',
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
