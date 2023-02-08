<script lang="ts">
import { defineComponent } from 'vue'
import CreditView from '@/views/CreditView.vue'

export default defineComponent({
  name: 'Welcome',
  components: { CreditView },
  emits: ['play'],
  data() {
    return {
      deferredPrompt: null as any,
      creditIsOpened: false,
    }
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
      ].includes(navigator.platform)
    },
  },
  created() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
    })
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt()
    },
  },
})
</script>

<template>
  <Transition name="zoom-fade">
    <CreditView v-if="creditIsOpened" @close="creditIsOpened = false" />
  </Transition>
  <div class="dt-home-screen">
    <img class="dt-img-w75" src="@/assets/departile.svg" alt="">
    <h1 class="dt-h1">
      DigitTales
    </h1>
    <DTButton @click="$emit('play')">
      Jouer
    </DTButton>

    <DTButton v-if="!isIphone" outlined @click="install">
      Installer l'application
    </DTButton>
    <DTButton text @click="creditIsOpened = true">
      Crédits
    </DTButton>
  </div>
</template>

<style>
</style>
