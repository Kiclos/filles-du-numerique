<template>
  <div class="dt-dialog">
    <text-container v-for="dialog in dialogsToDisplay" :key="dialog.id"
                    :class="dialog.isRebecca ? 'dt-textcontainer--neutral' : 'dt-textcontainer--default'">
      {{ dialog.content }}
    </text-container>
    <TapToContinue @click="nextMessage"/>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, onMounted,
} from 'vue';
import Dialog from './Dialog';
import TapToContinue from '@/components/TapToContinue/TapToContinue.vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';

export default defineComponent({
  name: 'Dialog',
  components: {
    TextContainer,
    TapToContinue,
  },
  /* props: {
    dialogs: {
      type: Object as ProtoType<Dialog>,
      required: true,
    },
  }, */
  setup() {
    const dialogs: Dialog [] = reactive([
      { id: 0, isRebecca: true, content: 'Bonjour' },
      { id: 1, isRebecca: false, content: 'Bonjour à toi aussi' },
    ]);
    const index = ref(0);

    const dialogsToDisplay: Dialog [] = reactive([]);

    function nextMessage(): void {
      if (dialogsToDisplay.length < dialogs.length) {
        dialogsToDisplay.push(dialogs[index.value]);
        index.value += 1;
      }
    }

    onMounted(() => {
      nextMessage();
    });

    return {
      dialogs,
      dialogsToDisplay,
      nextMessage,
    };
  },
});
</script>
