<script lang="ts">
import { computed, defineComponent } from 'vue'

import useGameStore from '@/stores/game'
import type { Island } from '@/Model/Island/Island'

export default defineComponent({
  name: 'Islands',
  events: { selectIsland: (island: Island) => island },
  setup(_, { emit }) {
    const gameStore = useGameStore()
    const islands: Island [] = gameStore.islands

    const isIphone = computed(() => [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform))

    function handleIslandSelection(island: Island): void {
      emit('selectIsland', island)
    }

    return {
      islands,
      handleIslandSelection,
      isIphone,
    }
  },
})
</script>

<template>
  <!-- eslint-disable -->
  <div class="dt-island" v-if="!isIphone">
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
      <Island v-for="island in islands" :key="island.id" :island="island" @click="handleIslandSelection(island)"/>
    </svg>
  </div>
  <div class="dt-island -iphone" v-else>
    <Island v-for="island in islands" :key="island.id" :island="island" @click="handleIslandSelection(island)"/>
  </div>
</template>
