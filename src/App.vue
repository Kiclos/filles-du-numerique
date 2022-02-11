<template>
  <NumberLink v-if="false"/>
  <FindTheWayOut v-if="false"/>
  <WinScreen v-if="false" reward="arm-right"/>
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
import dialogData from '@/assets/data/storyline.json';
import DialogView from '@/views/Dialog.vue';
import WelcomeView from '@/views/Welcome.vue';
import ResultsView from '@/views/Results.vue';
import Dialog from '@/Model/Dialog';
import IslandsView from '@/views/IslandsView.vue';
import useGameStore from './stores/game';
import { Island } from '@/Model/Island';
import NumberLink from '@/components/Games/NumberLink.vue';
import FindTheWayOut from '@/components/Games/FindTheWayOut.vue';
import WinScreen from '@/components/Islands/WinScreen.vue';

export default defineComponent({
  name: 'app',
  components: {
    DialogView,
    WelcomeView,
    ResultsView,
    IslandsView,
    NumberLink,
    FindTheWayOut,
    WinScreen,
  },
  setup() {
    const gameStore = useGameStore();

    const welcomeIsOpened = ref<boolean>(true);
    const mapIsOpened = ref<boolean>(false);
    const dialogIsOpened = ref<boolean>(false);
    const resultIsOpened = ref<boolean>(false);
    const dialogs = reactive<Dialog []>(dialogData.dialogs.separation);

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
