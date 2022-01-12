<template>
  <transition name="zoom-fade">
    <DialogView :dialogs="dialogs" @close="dialogIsOpened = false" v-if="dialogIsOpened"/>
  </transition>
  <Button class="dt-button--default" @click="dialogIsOpened = true">Open dialog</Button>
  <IslandsView/>
  <Home v-if="false"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DialogView from '@/views/Dialog.vue';
import Home from '@/views/Home.vue';
import Button from '@/components/Button/Button.vue';
import Dialog from '@/Model/Dialog';
import IslandsView from '@/views/IslandsView.vue';

export default defineComponent({
  name: 'app',
  components: {
    DialogView,
    Home,
    Button,
    IslandsView,
  },
  setup() {
    const dialogIsOpened = ref<boolean>(false);
    const dialogs = reactive<Dialog []>([
      { id: 0, isRebecca: true, content: 'Bonjour' },
      { id: 1, isRebecca: false, content: 'Bonjour à toi aussi' },
    ]);

    return {
      dialogIsOpened,
      dialogs,
    };
  },
});
</script>
