<template>
  <div id="dt-dialog-container" class="dt-dialog" @click="nextMessage()">
    <div class="dt-dialog__content">
      <TapToContinue/>
      <TransitionGroup class="dt-dialog__content" name="list" tag="div">
        <text-container v-for="dialog in dialogsToDisplay" :key="dialog.content"
                        class="dt-textcontainer"
                        :class="dialog.isRebecca ? '-neutral -rebecca' : (dialog.isRebecca === null ? '-none' : '-me')">
          {{ dialog.content }}
        </text-container>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, PropType } from 'vue';
import Dialog from '../Model/Dialog';
import TapToContinue from '../components/TapToContinue/TapToContinue.vue';
import TextContainer from '../components/TextContainer/TextContainer.vue';

export default defineComponent({
  name: 'Dialog',
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
    const index = ref<number>(0);

    const dialogsToDisplay: Dialog [] = reactive([]);

    function nextMessage(): void {
      if (dialogsToDisplay.length < props.dialogs.length) {
        dialogsToDisplay.unshift(props.dialogs[index.value]);
        index.value += 1;
      } else if (dialogsToDisplay.length === props.dialogs.length) {
        emit('close');
      }
    }

    onMounted(() => {
      nextMessage();
    });

    return {
      dialogsToDisplay,
      nextMessage,
    };
  },
});
</script>
