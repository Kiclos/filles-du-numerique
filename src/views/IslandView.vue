<template>
  <WinScreen v-if="step === 2"/>
  <GamePresentation color="blue" :content="cybersecurite"
                    @skipGame="step = 3"
                    @backToMap="handleBackToMap()"
                    v-if="step === 0"/>
  <Results v-if="step === 3"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue';
import GamePresentation from '@/components/Games/GamePresentation/GamePresentation.vue';
import Results from '@/components/Islands/Results.vue';
import WinScreen from '@/components/Islands/WinScreen.vue';
import { Island } from '@/Model/Island/Island';
import cybersecurite from '@/assets/data/cybersecurite.json';
import useGameStore from '@/stores/game';
import { IslandStatus } from '@/Model/GameStatus';

export default defineComponent({
  name: 'IslandView',
  components: {
    GamePresentation,
    Results,
    WinScreen,
  },
  props: {
    island: {
      type: Object as PropType<Island>,
      required: true,
    },
  },
  events: { backToMap: () => null },
  setup(props, { emit }) {
    const step = ref<number>(0);

    const gameStore = useGameStore();

    function handleBackToMap(): void {
      emit('backToMap');
      console.log('here 1');
    }

    onMounted(() => {
      if (props.island.status === IslandStatus.NOT_DISCOVERED) {
        gameStore.setIslandStatus(props.island.name, IslandStatus.OPENED);
      }
    });

    return {
      step,
      cybersecurite,
      handleBackToMap,
    };
  },
});
</script>
