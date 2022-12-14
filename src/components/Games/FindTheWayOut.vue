<template>
  <div class="dt-way-out__container">
    <PauseMenu @skip="handleSkipGame()" @quit="handleQuitGame()" color="green"/>
    <div class="dt-way-out__content">
      <div class="dt-way-out__pawn" :class="`-${pawn.orientation}`" :style="getPawnStyle"></div>
      <div v-for="i in 10" :key="`row-${i}`" class="dt-way-out__row">
        <div v-for="j in 10" :key="`square-${j}`"
             class="dt-way-out__square"
             :class="{ '-flagged': j === goal.x && i === goal.y }">
        </div>
      </div>
    </div>
   <div class="dt-way-out__interface">
     <div class="dt-way-out__instructions__container">
       <div class="dt-way-out__instructions" :class="{ '-reduced': isReduced }">
         <button class="dt-way-out__instructions__reduced" @click="isReduced = !isReduced" v-if="instructions.length > 0">
           {{ isReduced ? 'Agrandir' : 'Réduire' }}
         </button>
         <div class="dt-way-out__instructions__content">
           <div class="dt-way-out__instructions__none" v-if="instructions.length === 0">
             Cliquez sur une instruction pour commencer
           </div>
           <div v-for="(instruction, index) in instructions"
                :key="instruction"
                class="dt-button -green"
                :class="[ { '-text': index < executionIndex }, { '-outlined': index > executionIndex }, { '-disabled': executing }]">
             <template v-if="instruction === 0">
               <span class="icon-north"></span>
             </template>
             <template v-if="instruction === 1">
               <span class="icon-rotate_left"></span>
             </template>
             <template v-if="instruction === 2">
               <span class="icon-rotate_right"></span>
             </template>
             <button class="dt-way-out__instructions__delete-button"
                     aria-label="delete"
                     @click.stop="instructions.splice(index, 1)" v-if="(index > executionIndex) && !executing">✕</button>
           </div>
         </div>
       </div>
       <div class="dt-way-out__instructions__buttons">
         <button class="dt-button -outlined -green" :disabled="executing" @click="clear()">
           <span class="icon-close"></span>
         </button>
         <button class="dt-button -green" :disabled="instructions.length === 0 || executing" @click="executeInstructions()">
           <span class="icon-play_arrow"></span>
         </button>
       </div>
     </div>
     <div class="dt-way-out__commands">
       <button class="dt-button -outlined -green" :disabled="executing" @click="instructions.push(1)">
         <span class="icon-rotate_left"></span>
       </button>
       <button class="dt-button -outlined -green" :disabled="executing" @click="instructions.push(0)">
         <span class="icon-north"></span>
       </button>
       <button class="dt-button -outlined -green" :disabled="executing" @click="instructions.push(2)">
         <span class="icon-rotate_right"></span>
       </button>
     </div>
   </div>
   </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue';

import { Pawn, PawnInstruction, PawnOrientation } from '@/Model/Game/FindTheWayOut';

export default defineComponent({
  name: 'NumberLink',
  components: { PauseMenu },
  emits: ['skipGame', 'quitGame', 'endGame'],
  events: {
    skipGame: () => null,
    quitGame: () => null,
    endGame: () => null,
  },
  setup(_, { emit }) {
    const pawn: Pawn = reactive<Pawn>({ x: 0, y: 0, orientation: PawnOrientation.right });
    const instructions: PawnInstruction [] = reactive<PawnInstruction []>([]);
    const executionIndex = ref<number>(-1);
    const executing = ref<boolean>(false);
    const isReduced = ref<boolean>(false);
    const start = reactive<Pawn>({ x: 0, y: 0, orientation: PawnOrientation.right });
    const goal = reactive<{ x: number, y: number }>({ x: 10, y: 10 });

    const getPawnStyle = computed(() => ({ top: `${pawn.y * 10}%`, left: `${pawn.x * 10}%` }));

    function goForward(): void {
      // eslint-disable-next-line default-case
      switch (pawn.orientation) {
        case PawnOrientation.top:
          pawn.y = pawn.y > 0 ? pawn.y - 1 : pawn.y;
          break;
        case PawnOrientation.bottom:
          pawn.y = pawn.y < 9 ? pawn.y + 1 : pawn.y;
          break;
        case PawnOrientation.left:
          pawn.x = pawn.x > 0 ? pawn.x - 1 : pawn.x;
          break;
        case PawnOrientation.right:
          pawn.x = pawn.x < 9 ? pawn.x + 1 : pawn.x;
          break;
      }
    }

    function rotateLeft(): void {
      // eslint-disable-next-line default-case
      switch (pawn.orientation) {
        case PawnOrientation.top:
          pawn.orientation = PawnOrientation.left;
          break;
        case PawnOrientation.bottom:
          pawn.orientation = PawnOrientation.right;
          break;
        case PawnOrientation.left:
          pawn.orientation = PawnOrientation.bottom;
          break;
        case PawnOrientation.right:
          pawn.orientation = PawnOrientation.top;
          break;
      }
    }

    function rotateRight(): void {
      // eslint-disable-next-line default-case
      switch (pawn.orientation) {
        case PawnOrientation.top:
          pawn.orientation = PawnOrientation.right;
          break;
        case PawnOrientation.bottom:
          pawn.orientation = PawnOrientation.left;
          break;
        case PawnOrientation.left:
          pawn.orientation = PawnOrientation.top;
          break;
        case PawnOrientation.right:
          pawn.orientation = PawnOrientation.bottom;
          break;
      }
    }

    function reset(): void {
      Object.assign(pawn, start);
    }

    function clear(): void {
      reset();
      instructions.splice(0);
    }

    function isGameOver(): void {
      if (pawn.x + 1 === goal.x && pawn.y + 1 === goal.y) {
        emit('endGame');
      }
    }

    function executeInstruction(instruction: PawnInstruction): void {
      // eslint-disable-next-line default-case
      switch (instruction) {
        case PawnInstruction.moveForward:
          goForward();
          break;
        case PawnInstruction.rotateRight:
          rotateRight();
          break;
        case PawnInstruction.rotateLeft:
          rotateLeft();
          break;
      }
    }

    function executeInstructions(): void {
      reset();
      isReduced.value = true;
      executing.value = true;
      const execution = setInterval(() => {
        if (executionIndex.value === instructions.length - 1) {
          executing.value = false;
          clearInterval(execution);
          isGameOver();
          executionIndex.value = -2;
        }
        executionIndex.value += 1;
        executeInstruction(instructions[executionIndex.value]);
      }, 500);
    }

    function generateRandomGame(): void {
      const startX = Math.round(Math.random() * 9);
      const startY = Math.round(Math.random() * 9);
      const startOrientation = Object.values(PawnOrientation)[Math.round(Math.random() * 3)];
      let goalX;
      let goalY;
      let distance = 0;
      do {
        goalX = Math.round(Math.random() * 9) + 1;
        goalY = Math.round(Math.random() * 9) + 1;
        distance = Math.sqrt((goalX - (startX + 1)) ** 2 + (goalY - (startY + 1)) ** 2);
      } while (distance < 7);
      Object.assign(start, { x: startX, y: startY, orientation: startOrientation });
      Object.assign(goal, { x: goalX, y: goalY });
      reset();
    }

    function handleSkipGame(): void {
      emit('skipGame');
    }

    function handleQuitGame(): void {
      emit('quitGame');
    }

    onMounted(() => {
      generateRandomGame();
    });

    return {
      pawn,
      instructions,
      executionIndex,
      getPawnStyle,
      goal,
      executeInstructions,
      handleSkipGame,
      handleQuitGame,
      clear,
      executing,
      isReduced,
    };
  },
});
</script>
