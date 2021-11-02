<template>
  <div class="dt-p16">
    <Button class="dt-button">bonjour</Button>
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

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';

export default defineComponent({
  components: {
    TextContainer,
    Button,
  },
});
</script>
