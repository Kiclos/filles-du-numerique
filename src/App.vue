<template>
  <transition name="zoom-fade">
    <DialogView :dialogs="dialogs" @close="dialogIsOpened = false" v-if="dialogIsOpened"/>
  </transition>
  <transition name="zoom-fade">
    <WelcomeView @play="welcomeIsOpened = false" v-if="welcomeIsOpened"/>
  </transition>
  <transition name="zoom-fade">
    <ResultsView name="dialogs" @close="resultIsOpened = false" v-if="resultIsOpened"/>
  </transition>
  <transition name="zoom-fade">
    <PresentationView name="presentation" @close="presentationIsOpened = false" v-if="presentationIsOpened"/>
  </transition>
  <Button class="dt-button--default" @click="dialogIsOpened = true">Open dialog</Button>
  <Button class="dt-button--default" @click="welcomeIsOpened = true">Open welcome</Button>
  <Button class="dt-button--default" @click="resultIsOpened = true">Open results</Button>
  <Button class="dt-button--default" @click="presentationIsOpened = true">Open presentation</Button>
  <Home/>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import DialogView from '@/views/Dialog/Dialog.vue';
import WelcomeView from '@/views/Welcome.vue';
import ResultsView from '@/views/Results.vue';
import PresentationView from '@/views/Presentation.vue';
import Home from '@/views/Home.vue';
import Button from '@/components/Button/Button.vue';
import Dialog from '@/Model/Dialog';

export default defineComponent({
  name: 'app',
  components: {
    DialogView,
    WelcomeView,
    ResultsView,
    PresentationView,
    Home,
    Button,
  },
  setup() {
    const dialogIsOpened = ref<boolean>(false);
    const welcomeIsOpened = ref<boolean>(true);
    const resultIsOpened = ref<boolean>(false);
    const presentationIsOpened = ref<boolean>(false);
    const dialogs = reactive<Dialog []>([
      { id: 0, isRebecca: true, content: 'Bonjour' },
      { id: 1, isRebecca: false, content: 'Bonjour à toi aussi' },
    ]);

    return {
      dialogIsOpened,
      welcomeIsOpened,
      resultIsOpened,
      presentationIsOpened,
      dialogs,
    };
  },
});
</script>
