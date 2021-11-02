<template>
  <div class="dt-p16">
    <dt-button>bonjour</dt-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import button from '../components/button/button.vue';

export default defineComponent({
  components: {
    'dt-button': button,
  },
});
</script>
