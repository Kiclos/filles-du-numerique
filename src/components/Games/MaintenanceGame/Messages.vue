<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import Message from './Message.vue'

export interface MessageType {
  content: string
  isImage: boolean
  isMine: boolean
}

export default defineComponent({
  name: 'Messages',
  components: { Message },
  props: {
    messages: {
      type: Array as PropType<MessageType[]>,
      required: true,
    },
    choixAvailable: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<template>
  <div ref="messagesBox" class="messagesBox">
    <div v-if="choixAvailable" class="yourMessage">
      Que lui réponds-tu ?
    </div>
    <Message v-for="(message) in messages" :key="message.content" :message="message" />
  </div>
</template>

<style lang="scss" scoped>
.messagesBox {
  padding: 3%;
  width: 100%;
  scrollbar-width: thin;
  display: flex;
  flex-direction: column-reverse;
}

.yourMessage {
  align-self: flex-end;
  background-color: white;
  color: #8C8C8C;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: end;
  font-style: italic;
}
</style>
