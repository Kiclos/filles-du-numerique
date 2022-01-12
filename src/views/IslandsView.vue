<template>
  <IslandsUI/>
  <Islands/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Islands from '@/components/Islands/Islands.vue';
import IslandsUI from '@/components/IslandsUI/IslandsUI.vue';

export default defineComponent({
  name: 'IslandsView',
  components: {
    Islands,
    IslandsUI,
  },
});
</script>
