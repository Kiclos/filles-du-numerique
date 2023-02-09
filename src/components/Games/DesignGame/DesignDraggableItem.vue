<script setup lang="ts">
import { useSlots } from 'vue'
import { Container, Draggable } from 'vue-dndrop'
const emit = defineEmits(['onDragStart'])
const getGhostParent = () => {
  return document.body
}
const slots = useSlots()

const emitStart = () => {
  emit('onDragStart')
}
</script>

<template>
  <Container
    :get-child-payload="
      () => ({
        tag: slots?.displayElement?.()[0] ?? slots?.default?.()[0],
      })
    "
    :drag-begin-delay="0"
    :should-animate-drop="() => false"
    :get-ghost-parent="getGhostParent"
    group-name="myDrop"
    behaviour="copy"
    @drag-start="emitStart"
  >
    <Draggable ref="selectedItem" class="border-2 border-dashed rounded-lg border-gray-400 p-4">
      <slot />
    </Draggable>
  </Container>
</template>
