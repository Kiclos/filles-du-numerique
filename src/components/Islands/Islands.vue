<template>
  <!-- eslint-disable -->
  <div class="dt-island">
    <svg viewBox="0 0 450 700" fill="none">
      <svg viewBox="0 0 900 1400" x="0" y="0" width="450" height="700">
        <foreignObject x="0" y="0" width="900" height="1400">
          <img src="@/assets/img/lines.png" alt="map">
        </foreignObject>
      </svg>
      <svg viewBox="0 0 900 1400"  x="0" y="0" width="450" height="700">
        <foreignObject x="0" y="0" width="900" height="1400">
          <img src="@/assets/img/Robotix.png" alt="map">
        </foreignObject>
      </svg>
      <svg viewBox="0 0 450 700"  x="0" y="0" width="450" height="700">
        <IslandsComponent v-for="island in islands" :key="island.id" :island="island" @click="handleIslandSelection(island)"/>
      </svg>
  </svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import useGameStore from '@/stores/game';
import { Island } from '@/Model/Island/Island';
import IslandsComponent from '@/components/Islands/Island.vue';

export default defineComponent({
  name: 'Islands',
  components: { IslandsComponent },
  events: { selectIsland: (island: Island) => island },
  setup(_, { emit }) {
    const gameStore = useGameStore();
    const islands: Island [] = gameStore.islands;

    function handleIslandSelection(island: Island): void {
      emit('selectIsland', island);
    }

    return {
      islands,
      handleIslandSelection,
    };
  },
});
</script>
