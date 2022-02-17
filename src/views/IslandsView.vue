<template>
  <IslandsUI/>
  <Islands @selectIsland="handleIslandSelection($event)"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Islands from '@/components/Islands/Islands.vue';
import IslandsUI from '@/components/Islands/IslandsUI/IslandsUI.vue';
import { Island } from '@/Model/Island/Island';

export default defineComponent({
  name: 'IslandsView',
  components: {
    Islands,
    IslandsUI,
  },
  emits: ['selectIsland'],
  events: { selectIsland: (island: Island) => island },
  setup(_, { emit }) {
    function handleIslandSelection(island: Island): void {
      emit('selectIsland', island);
    }

    return { handleIslandSelection };
  },
});
</script>
