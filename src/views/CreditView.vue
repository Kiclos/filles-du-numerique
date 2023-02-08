<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreditView',
  emits: ['close'],
  events: { close: () => null },
  setup(_, { emit }) {
    function handleClose(): void {
      emit('close')
    }

    return { handleClose }
  },
})
</script>

<template>
  <div class="dt-credit">
    <div class="dt-credit__content">
      <h1 class="dt-credit__title">
        Crédits
      </h1>
      <h2 class="dt-credit__subtitle">
        <span class="dt-credit__subtitle__label">Développeurs</span>
        Clémentine Biais <br>
        Thomas Gaubert <br>
        Loïs Gigaud <br>
        Théo Letouzé <br>
        Clément Nicolas <br>
        Julien Raquois <br>
      </h2>
      <h2 class="dt-credit__subtitle">
        <span class="dt-credit__subtitle__label">Partenaires</span>
        <div class="dt-credit__facet">
          <img class="dt-credit__logo" src="/img/Partners/FACET.png" alt="logo_FACET">
          <span class="dt-credit__logo__label">Femmes Au <br>Coeur <debr /> l'EnTreprise</span>
        </div>
        <br>
        <img class="dt-credit__logo" src="/img/Partners/FR-CIDFF.png" alt="logo_FR-CIDFF">
        <img class="dt-credit__logo" src="/img/Partners/IESF.png" alt="logo_IESF">
        <img class="dt-credit__logo" src="/img/Partners/logo_imt.png" alt="logo_IMT">
      </h2>
      <DTButton @click="handleClose()">
        Retour au menu
      </DTButton>
    </div>
  </div>
</template>
