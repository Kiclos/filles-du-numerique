<script lang="ts">
import { defineComponent } from 'vue'
import Button from '../components/Button/Button.vue'
import TapToContinue from '@/components/TapToContinue/TapToContinue.vue'
import TextContainer from '@/components/TextContainer/TextContainer.vue'

export default defineComponent({
  components: {
    TapToContinue,
    TextContainer,
    Button,
  },
})
</script>

<template>
  <div class="dt-p16">
    <Button class="dt-button">
      bonjour
    </Button>
    <TapToContinue />
    <Button class="dt-button--default">
      Commencer le jeu
    </Button>
    <Button class="dt-button--text">
      Commencer le jeu
    </Button>
    <Button class="dt-button--reversed-text">
      Commencer le jeu
    </Button>
    <Button class="dt-button--outlined">
      Commencer le jeu
    </Button>
    <Button class="dt-button--reversed-outlined">
      Commencer le jeu
    </Button>
    <Button class="dt-button--reversed">
      Commencer le jeu
    </Button>
    <Button class="dt-button--blue">
      Commencer le jeu
    </Button>
    <TextContainer class="dt-textcontainer--default">
      <p>Quoi qu’il est peut être juste éteint...</p>
    </TextContainer>
    <TextContainer class="dt-textcontainer--blue">
      <p>Quoi qu’il est peut être juste éteint...</p>
    </TextContainer>
    <TextContainer class="dt-textcontainer--neutral">
      <p>Quoi qu’il est peut être juste éteint...</p>
    </TextContainer>
  </div>
</template>
