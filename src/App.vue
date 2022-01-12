<template>
  <transition name="zoom-fade">
    <DialogView :dialogs="dialogs" @close="handleDialogClose()" v-if="dialogIsOpened"/>
  </transition>
  <transition name="zoom-fade">
    <ResultsView name="dialogs" @close="resultIsOpened = false" v-if="resultIsOpened"/>
  </transition>
  <WelcomeView @play="handleGameStart()" v-if="welcomeIsOpened"/>
  <IslandsView @selectIsland="handleIslandSelection($event)" v-if="mapIsOpened"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DialogView from '@/views/Dialog.vue';
import WelcomeView from '@/views/Welcome.vue';
import ResultsView from '@/views/Results.vue';
import Dialog from '@/Model/Dialog';
import IslandsView from '@/views/IslandsView.vue';
import useGameStore from './stores/game';
import { Island } from '@/Model/Island';

export default defineComponent({
  name: 'app',
  components: {
    DialogView,
    WelcomeView,
    ResultsView,
    IslandsView,
  },
  setup() {
    const gameStore = useGameStore();

    const welcomeIsOpened = ref<boolean>(true);
    const mapIsOpened = ref<boolean>(false);
    const dialogIsOpened = ref<boolean>(false);
    const resultIsOpened = ref<boolean>(false);
    const dialogs = reactive<Dialog []>([
      { id: 0, isRebecca: true, content: 'Bonjour' },
      { id: 1, isRebecca: false, content: 'Bonjour à toi aussi' },
    ]);

    function handleGameStart(): void {
      welcomeIsOpened.value = false;
      dialogIsOpened.value = true;
    }

    function handleIslandSelection(island: Island): void {
      console.log('selected island', island);
      resultIsOpened.value = true;
    }

    function handleDialogClose(): void {
      mapIsOpened.value = true;
      dialogIsOpened.value = false;
    }

    return {
      welcomeIsOpened,
      mapIsOpened,
      dialogIsOpened,
      resultIsOpened,
      dialogs,
      gameStore,
      handleGameStart,
      handleIslandSelection,
      handleDialogClose,
    };
  },
});
</script>
