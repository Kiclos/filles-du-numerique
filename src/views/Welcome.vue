<template>
  <div class="dt-home-screen">
    <img class="dt-img-w75" src="@/assets/departile.svg" alt="">
    <h1 class="dt-h1">DigitTales</h1>
    <button class="dt-button" @click="$emit('play')">Jouer</button>
    <button class="dt-button -outlined" @click="install" v-if="!isIphone">Installer l'application</button>
    <button class="dt-button -text">Crédits</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'welcome',
  data() {
    return { deferredPrompt: null as any };
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
      console.log('in before');
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  },
  methods: {
    async install() {
      console.log('in install', this.deferredPrompt);
      this.deferredPrompt.prompt();
    },
  },
});
</script>
