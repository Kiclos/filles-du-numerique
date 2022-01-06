<template>
  <!-- eslint-disable -->
  <g class="dt-segura">
    <foreignObject class="dt-island__container" x="48" y="154" width="120px" height="100">
      <div class="dt-island__content">
        <div class="dt-island__icon">
          <img src="@/assets/img/icon/shield.png" alt="shield.png">
        </div>
        <island-title :checked="checked">Segura</island-title>
      </div>
    </foreignObject>
  </g>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';

export default defineComponent({
  name: 'Segura',
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
