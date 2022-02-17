<template>
  <div id="dt-dialog-container" class="dt-dialog" @click="nextMessage()">
    <div class="dt-dialog__content">
      <text-container v-for="dialog in dialogsToDisplay" :key="dialog.id"
                      class="dt-textcontainer"
                      :class="dialog.isRebecca ? '-neutral -rebecca' : (dialog.isRebecca === null ? '-none' : '-me')">
        {{ dialog.content }}
      </text-container>
      <TapToContinue/>
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
      const container = document.getElementById('dt-dialog-container');
      if (dialogsToDisplay.length < props.dialogs.length) {
        dialogsToDisplay.push(props.dialogs[index.value]);
        index.value += 1;
        if (container !== null) {
          setTimeout(() => {
            window.scrollTo({ left: 0, top: container.offsetHeight, behavior: 'smooth' });
          });
        }
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
