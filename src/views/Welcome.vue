<template>
  <Transition name="zoom-fade">
    <CreditView @close="creditIsOpened = false" v-if="creditIsOpened"/>
  </Transition>
  <div class="dt-home-screen">
    <img class="dt-img-w75" src="@/assets/departile.svg" alt="">
    <h1 class="dt-h1">DigitTales</h1>
    <button class="dt-button" @click="$emit('play')">Jouer</button>
    <button class="dt-button -outlined" @click="install" v-if="!isIphone">Installer l'application</button>
    <button class="dt-button -text" @click="creditIsOpened = true">Crédits</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreditView from '@/views/CreditView.vue';

export default defineComponent({
  name: 'welcome',
  components: { CreditView },
  data() {
    return {
      deferredPrompt: null as any,
      creditIsOpened: false,
    };
  },
  computed: {
    isIphone() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform);
    },
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    },
  },
});
</script>
