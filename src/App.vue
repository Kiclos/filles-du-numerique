<template>
  <transition name="zoom-fade">
    <DialogView :dialogs="dialogs" @close="dialogIsOpened = false" v-if="dialogIsOpened"/>
  </transition>
  <Button class="dt-button--default" @click="dialogIsOpened = true">Open dialog</Button>
  <Islands/>
  <Home v-if="false"/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DialogView from '@/views/Dialog/Dialog.vue';
import Home from '@/views/Home.vue';
import Button from '@/components/Button/Button.vue';
import Islands from '@/components/Islands/Islands.vue';
import Dialog from '@/Model/Dialog';

export default defineComponent({
  name: 'app',
  components: {
    DialogView,
    Home,
    Button,
    Islands,
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
