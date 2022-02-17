<template>
  <transition name="zoom-fade">
    <DialogView :dialogs="dialogs" @close="handleDialogClose()" v-if="dialogIsOpened"/>
  </transition>
  <transition name="zoom-fade">
    <IslandView :island="currentIsland" @backToMap="handleBackToMap()"  v-if="islandViewIsOpened"/>
  </transition>
  <WelcomeView @play="handleGameStart()" v-if="welcomeIsOpened"/>
  <IslandsView @selectIsland="handleIslandSelection($event)" v-if="mapIsOpened"/>
</template>

<script lang="ts">
/* eslint-disable prefer-object-spread */
import { defineComponent, onMounted, reactive, ref } from 'vue';
import dialogData from '@/assets/data/storyline.json';
import DialogView from '@/views/Dialog.vue';
import WelcomeView from '@/views/Welcome.vue';
import Dialog from '@/Model/Dialog';
import IslandView from '@/views/IslandView.vue';
import IslandsView from '@/views/IslandsView.vue';
import useGameStore from './stores/game';
import { Island } from '@/Model/Island/Island';
import { GameStatus, IslandStatus } from '@/Model/GameStatus';

export default defineComponent({
  name: 'app',
  components: {
    DialogView,
    IslandView,
    IslandsView,
    WelcomeView,
  },
  setup() {
    const gameStore = useGameStore();

    const welcomeIsOpened = ref<boolean>(true);
    const mapIsOpened = ref<boolean>(false);
    const dialogIsOpened = ref<boolean>(false);
    const resultIsOpened = ref<boolean>(false);
    const islandViewIsOpened = ref<boolean>(false);
    const dialogs = reactive<Dialog []>(dialogData.dialogs.intro);

    const currentIsland: Island = reactive<Island>({} as Island);

    function handleGameStart(): void {
      welcomeIsOpened.value = false;
      if (gameStore.status === GameStatus.INIITAL_STATE) {
        dialogIsOpened.value = true;
      } else {
        mapIsOpened.value = true;
      }
    }

    function handleIslandSelection(island: Island): void {
      Object.assign(currentIsland, island);
      islandViewIsOpened.value = true;
    }

    function handleDialogClose(): void {
      switch (gameStore.status) {
        case GameStatus.INIITAL_STATE:
          gameStore.setGameStatus(GameStatus.POST_INTRO);
          dialogIsOpened.value = false;
          setTimeout(() => {
            Object.assign(dialogs, dialogData.dialogs.meeting);
            dialogIsOpened.value = true;
          });
          break;
        case GameStatus.POST_INTRO:
          dialogIsOpened.value = false;
          mapIsOpened.value = true;
          break;
        case GameStatus.ALL_GAMES_COMPLETE:
          gameStore.setGameStatus(GameStatus.POST_OUTRO);
          dialogIsOpened.value = false;
          setTimeout(() => {
            Object.assign(dialogs, dialogData.dialogs.ending);
            dialogIsOpened.value = true;
          });
          break;
        case GameStatus.POST_OUTRO:
          dialogIsOpened.value = false;
          welcomeIsOpened.value = true;
          break;
        default:
          break;
      }
    }

    function handleBackToMap(): void {
      islandViewIsOpened.value = false;
      const nbPieces = gameStore.islands.filter(x => x.status === IslandStatus.COMPLETE).length;
      if (nbPieces === 6 && gameStore.status === GameStatus.POST_INTRO) {
        gameStore.setGameStatus(GameStatus.ALL_GAMES_COMPLETE);
        Object.assign(dialogs, dialogData.dialogs.separation);
        dialogIsOpened.value = true;
        mapIsOpened.value = false;
      }
    }

    onMounted(() => {
      const gameStatus = localStorage.getItem('gameStatus');
      if (gameStatus !== null) {
        gameStore.setGameStatus(JSON.parse(gameStatus));
      }
      const islands = localStorage.getItem('islands');
      if (islands !== null) {
        JSON.parse(islands)
          .forEach((island: Island) => {
            gameStore.setIslandStatus(island.name, island.status);
          });
      }
    });

    return {
      currentIsland,
      welcomeIsOpened,
      mapIsOpened,
      dialogIsOpened,
      resultIsOpened,
      islandViewIsOpened,
      dialogs,
      gameStore,
      handleGameStart,
      handleIslandSelection,
      handleDialogClose,
      handleBackToMap,
    };
  },
});
</script>
