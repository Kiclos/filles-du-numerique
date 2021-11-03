<template>
  <div class="dt-p16">
    <Button class="dt-button">bonjour</Button>
    <TapToContinue/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';
import TapToContinue from '@/components/TapToContinue/TapToContinue.vue';

export default defineComponent({
  components: {
    TapToContinue,
    Button,
  },
});
</script>
