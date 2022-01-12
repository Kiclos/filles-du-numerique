<template>
  <div class="dt-islands-ui__counter">
    <span class="dt-islands-ui__counter__icon"></span>
    0/6
  </div>
  <div class="dt-islands-ui__dialog">
    <span class="dt-islands-ui__dialog__icon"></span>
    <text-container class="dt-textcontainer--neutral">
      Quel est notre prochaine destination ?
    </text-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';

export default defineComponent({
  name: 'IslandsUI',
  components: {
    TextContainer,
  },
});
</script>
