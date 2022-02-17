<template>
  <div class="dt-p16 dt-flex-align-text--center dt-h100">
    <img class="dt-img-w75" src="@/assets/departile.svg" alt="">
    <h1 class="dt-h1">DigitTales</h1>
    <br>
    <Button class="dt-button" @click="$emit('play')">Jouer</Button>
    <Button class="dt-button -outlined">Crédits</Button>

    <Button class="dt-button -outlined" @click="install">Installer l'application</Button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';

export default defineComponent({
  name: 'welcome',
  components: { Button },
  data() {
    return { deferredPrompt: null as any };
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
