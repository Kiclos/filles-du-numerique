<template>
  <transition name="zoom-fade">
    <DialogView :dialogs="dialogs" @close="dialogIsOpened = false" v-if="dialogIsOpened"/>
  </transition>
  <IslandsView @selectIsland="handleIslandSelection($event)"/>
  <transition name="zoom-fade">
    <WelcomeView @play="welcomeIsOpened = false" v-if="welcomeIsOpened"/>
  </transition>
  <transition name="zoom-fade">
    <ResultsView name="dialogs" @close="resultIsOpened = false" v-if="resultIsOpened"/>
  </transition>
  <Button class="dt-button--default" @click="dialogIsOpened = true">Open dialog</Button>
  <Button class="dt-button--default" @click="welcomeIsOpened = true">Open welcome</Button>
  <Button class="dt-button--default" @click="resultIsOpened = true">Open results</Button>
  <IslandsView v-if="false"/>
  <Home v-if="false"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DialogView from '@/views/Dialog.vue';
import WelcomeView from '@/views/Welcome.vue';
import ResultsView from '@/views/Results.vue';
import Home from '@/views/Home.vue';
import Button from '@/components/Button/Button.vue';
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
    Home,
    Button,
    IslandsView,
  },
  setup() {
    const gameStore = useGameStore();

    const dialogIsOpened = ref<boolean>(false);
    const welcomeIsOpened = ref<boolean>(true);
    const resultIsOpened = ref<boolean>(false);
    const dialogs = reactive<Dialog []>([
      { id: 0, isRebecca: true, content: 'Bonjour' },
      { id: 1, isRebecca: false, content: 'Bonjour à toi aussi' },
    ]);

    function handleIslandSelection(island: Island): void {
      console.log('selected island', island);
    }

    return {
      dialogIsOpened,
      welcomeIsOpened,
      resultIsOpened,
      dialogs,
      gameStore,
      handleIslandSelection,
    };
  },
});
</script>
