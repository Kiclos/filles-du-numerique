<script lang="ts">
import { defineComponent } from 'vue'
import IslandsUI from '@/components/Islands/IslandsUI/IslandsUI.vue'
import type { Island } from '@/Model/Island/Island'

export default defineComponent({
  name: 'IslandsView',
  components: {
    IslandsUI,
  },
  emits: ['selectIsland'],
  events: { selectIsland: (island: Island) => island },
  setup(_, { emit }) {
    function handleIslandSelection(island: Island): void {
      emit('selectIsland', island)
    }

    return { handleIslandSelection }
  },
})
</script>

<template>
  <IslandsUI />
  <IslandsItems @selectIsland="handleIslandSelection($event)" />
</template>
