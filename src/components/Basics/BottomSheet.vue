<script setup lang="ts">
const { isOpen, height } = defineProps({
  mobileBar: {
    type: Boolean,
    default: true,
  },
  isOpen: Boolean,
  height: String,
  className: String,
})
const emit = defineEmits(['onClose'])
</script>

<template>
  <Teleport to="body">
    <div
      :class="[!isOpen ? 'translate-y-full' : 'test', className]"
      class="bg-white flex px-6 flex-col w-full items-start fixed bottom-0 z-20 transition-all rounded-t-lg h-2/3"
      :style="height ? { height } : {}"
    >
      <div v-if="mobileBar" class="mx-auto mt-6 h-2 w-28 bg-gray-300 rounded-full" />
      <slot />
    </div>
    <div
      v-if="isOpen"
      class="bg-gray-900 z-10 fixed left-0 top-0 opacity-80 h-screen w-screen"
      @click="emit('onClose')"
    />
  </Teleport>
</template>
