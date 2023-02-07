<script setup lang="ts">
const { text, color } = defineProps<{ text?: string; color?: string }>()
</script>

<template>
  <button
    :style="`background: ${color}`"
    class="border-none font-medium rounded-lg w-full px-4 py-3 outline-none text-white"
  >
    {{ text }}
  </button>
</template>
