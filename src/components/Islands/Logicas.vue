<template>
  <!-- eslint-disable-->
  <g class="dt-logicas">
    <foreignObject class="dt-island__container" x="295" y="265" width="120px" height="100">
      <div class="dt-island__content">
        <div class="dt-island__icon" style="padding: .5rem">
          <img src="@/assets/img/icon/software.png" alt="robot.png">
        </div>
        <island-title :checked="checked">Logicas</island-title>
      </div>
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
