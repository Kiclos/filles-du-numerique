<template>
  <!-- eslint-disable -->
  <g class="dt-iaie">
    <foreignObject class="dt-island__container" x="300" y="480" width="120px" height="100">
      <div class="dt-island__content">
        <div class="dt-island__icon" style="padding: .5rem">
          <img src="@/assets/img/icon/software.png" alt="robot.png">
        </div>
        <island-title :checked="checked">IAïe</island-title>
      </div>
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
