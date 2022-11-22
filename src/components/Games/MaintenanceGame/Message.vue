<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { MessageType } from './Messages.vue'

export default defineComponent({
  name: 'Message',
  props: {
    message: {
      type: Object as PropType<MessageType>,
      required: true,
    },
  },
  setup(props) {
    // eslint-disable-next-line no-console
    console.log(props.message.content)
    // eslint-disable-next-line no-console
    console.log(props.message.isImage)

    const imageUrl = props.message.isImage ? new URL(`../../../assets/img/${props.message.content}`, import.meta.url).href : null
    return {
      imageUrl,
    }
  },
})
</script>

<template>
  <div v-if="message.isImage && imageUrl" :class="[message.isMine ? 'rightMessage' : 'leftMessage']" class="image">
    <img :src="imageUrl">
  </div>
  <p v-else :class="[message.isMine ? 'rightMessage' : 'leftMessage']" class="message">
    {{ message.content }}
  </p>
</template>

<style lang="scss" scoped>
.leftMessage {
  align-self: flex-start;
  background: #FDCB6A;
}

.rightMessage {
  align-self: flex-end;
  background: #FFFFFF;
  text-align: end;
}

.message {
  color: black;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.image {
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.image img {
  width: 200px;
}
</style>
