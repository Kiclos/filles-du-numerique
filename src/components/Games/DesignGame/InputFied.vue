<script setup lang="ts">
const { label, type, className } = defineProps<{
  label?: string
  type?: string
  className?: string
}>()
</script>

<template>
  <div :class="className">
    <p class="text-gray-900 font-medium mb-1">{{ label }}</p>
    <input
      :type="type ?? 'text'"
      class="border-none select-none pointer-events-none rounded w-full px-4 py-2 bg-gray-100 outline-none text-gray-800"
    />
  </div>
</template>
