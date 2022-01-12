<template>
  <transition name="zoom-fade">
    <DialogView :dialogs="dialogs" @close="dialogIsOpened = false" v-if="dialogIsOpened"/>
  </transition>
  <IslandsView/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DialogView from '@/views/Dialog.vue';
import Dialog from '@/Model/Dialog';
import IslandsView from '@/views/IslandsView.vue';
import useGameStore from './stores/game';

export default defineComponent({
  name: 'app',
  components: {
    DialogView,
    IslandsView,
  },
  setup() {
    const gameStore = useGameStore();

    const dialogIsOpened = ref<boolean>(false);
    const dialogs = reactive<Dialog []>([
      { id: 0, isRebecca: true, content: 'Bonjour' },
      { id: 1, isRebecca: false, content: 'Bonjour à toi aussi' },
    ]);

    return {
      dialogIsOpened,
      dialogs,
      gameStore,
    };
  },
});
</script>
