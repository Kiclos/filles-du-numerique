<script>
import { defineComponent } from 'vue'

export default defineComponent({ name: 'DTButton' })
</script>

<template>
  <button class="dt-button">
    <slot />
  </button>
</template>
