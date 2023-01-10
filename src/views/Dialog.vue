<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import type Dialog from '../Model/Dialog'
import TapToContinue from '../components/TapToContinue/TapToContinue.vue'
import TextContainer from '../components/TextContainer/TextContainer.vue'

export default defineComponent({
  name: 'DialogComponent',
  components: {
    TextContainer,
    TapToContinue,
  },
  props: {
    dialogs: {
      type: Object as PropType<Dialog []>,
      required: true,
    },
  },
  events: { close: () => null },
  setup(props, { emit }) {
    const index = ref<number>(0)

    const dialogsToDisplay: Dialog [] = reactive([])

    function nextMessage(): void {
      if (dialogsToDisplay.length < props.dialogs.length) {
        dialogsToDisplay.unshift(props.dialogs[index.value])
        index.value += 1
      }
      else if (dialogsToDisplay.length === props.dialogs.length) {
        emit('close')
      }
    }

    onMounted(() => {
      nextMessage()
    })

    return {
      dialogsToDisplay,
      nextMessage,
    }
  },
})
</script>

<template>
  <div id="dt-dialog-container" class="dt-dialog" @click="nextMessage()">
    <div class="dt-dialog__content">
      <TapToContinue />
      <TransitionGroup class="dt-dialog__content" name="list" tag="div">
        <TextContainer
          v-for="dialog in dialogsToDisplay" :key="dialog.content"
          class="dt-textcontainer"
          :class="dialog.isRebecca ? '-neutral -rebecca' : (dialog.isRebecca === null ? '-none' : '-me')"
        >
          {{ dialog.content }}
        </TextContainer>
      </TransitionGroup>
    </div>
  </div>
</template>

<style lang="scss">
.dt-dialog {
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  top: 0;
  left: 0;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background-color: $white;
  z-index: 2;
  transition: .3s;

  &__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column-reverse;
    max-width: 500px;
    height: 100%;
    width: 100%;
    //overflow: scroll;
  }

  & .dt-textcontainer {
    width: 100%;
    margin: .5rem 0;
    pointer-events: none;
  }

  & .dt-taptocontinue {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    font-size: .7rem;
    animation: 2s clignote infinite;
    padding-bottom: 1rem;
  }
}

@keyframes dialog-zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes clignote {
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
}
</style>
