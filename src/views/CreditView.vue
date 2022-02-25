<template>
  <div class="dt-credit">
    <div class="dt-credit__content">
      <h1 class="dt-credit__title">Crédits</h1>
      <h2 class="dt-credit__subtitle">
        <span class="dt-credit__subtitle__label">Développeurs</span>
        Clémentine Biais <br>
        Thomas Gaubert
      </h2>
      <h2 class="dt-credit__subtitle">
        <span class="dt-credit__subtitle__label">Partenaires</span>
        FACET <br>
        Femmes du numérique
      </h2>

    </div>
    <button class="dt-button" @click="handleClose()">Retour au menu</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreditView',
  emits: ['close'],
  events: { close: () => null },
  setup(_, { emit }) {
    function handleClose(): void {
      emit('close');
    }

    return { handleClose };
  },
});
</script>
