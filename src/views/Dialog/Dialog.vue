<template>
  <div class="dt-dialog" @click="nextMessage">
    <text-container v-for="dialog in dialogsToDisplay" :key="dialog.id"
                    :class="dialog.isRebecca ? 'dt-textcontainer--neutral' : 'dt-textcontainer--default'">
      {{ dialog.content }}
    </text-container>
    <TapToContinue/>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, onMounted, PropType,
} from 'vue';
import Dialog from '../../Model/Dialog';
import TapToContinue from '../../components/TapToContinue/TapToContinue.vue';
import TextContainer from '../../components/TextContainer/TextContainer.vue';

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
  events: {
    close: () => null,
  },
  setup(props, { emit }) {
    const index = ref<number>(0);

    const dialogsToDisplay: Dialog [] = reactive([]);

    function nextMessage(): void {
      if (dialogsToDisplay.length < props.dialogs.length) {
        dialogsToDisplay.push(props.dialogs[index.value]);
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
