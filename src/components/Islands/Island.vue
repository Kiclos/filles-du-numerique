<template>
  <!-- eslint-disable -->
  <g :class="'dt-' + island.name.toLowerCase()" v-if="island">
    <foreignObject class="dt-island__container" :x="island.coord.x" :y="island.coord.y" width="120px" height="100">
      <div class="dt-island__content" :class="[{'-not-discovered': island.status === 0}, { '-complete': island.status === 3}]">
        <div class="dt-island__icon" style="padding: .5rem">
          <template v-if="island.status === 0"> ? </template>
          <img src="@/assets/img/icon/software.png" alt="robot.png" v-else>
        </div>
        <island-title :checked="island.status >= 2" v-if="island.status !== 0">{{ island.name }}</island-title>
      </div>
    </foreignObject>
  </g>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import IslandTitle from '@/components/Islands/IslandTitle.vue';
import { Island } from '@/Model/Island';

export default defineComponent({
  name: 'island',
  components: { IslandTitle },
  props: {
    island: {
      type: Object as PropType<Island>,
      required: true,
    },
  },
});
</script>
