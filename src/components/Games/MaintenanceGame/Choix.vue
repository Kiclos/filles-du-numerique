<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export interface ChoixType {
  content: string[]
  goodChoice: number
}

export default defineComponent({
  name: 'Choix',
  props: {
    choixList: {
      type: Object as PropType<ChoixType | undefined>,
      required: true,
    },
    choixAvailable: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['handleChoix'],
  setup(props, { emit }) {
    function handleChoix(index: number) {
      if (props.choixAvailable)
        emit('handleChoix', index)
    }

    return {
      handleChoix,
    }
  },
})
</script>

<template>
  <div class="choiceContentWrapper">
    <div v-if="choixList" class="choiceContent">
      <div v-for="(choix, index) in choixList.content" :key="index" :message="choix" class="message"
        @click="() => handleChoix(index)">
        {{ choix }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.choiceContentWrapper {
  background: white;
  height: 200px;
}

.choiceContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.message {
  width: 80%;
  background: #FDCB6A;
  color: black;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 5px;
  text-align: center;
  cursor: pointer;
}
</style>
