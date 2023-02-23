<script setup lang="ts">
const { text, color, className } = defineProps<{
  text?: string
  color?: string
  className?: string
}>()
</script>

<template>
  <button
    :style="`background: ${color}`"
    :class="className"
    class="border-none select-none font-medium rounded-lg w-full px-4 py-3 outline-none text-white"
  >
    {{ text }}
  </button>
</template>
