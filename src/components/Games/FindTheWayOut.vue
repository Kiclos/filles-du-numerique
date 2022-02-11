<template>
  <div class="dt-way-out__container">
    <PauseMenu color="green"/>
    <div class="dt-way-out__content">
      <div class="dt-way-out__pawn" :class="`-${pawn.orientation}`" :style="getPawnStyle"></div>
      <div v-for="i in 10" :key="`row-${i}`" class="dt-way-out__row">
        <div v-for="j in 10" :key="`square-${j}`"
             class="dt-way-out__square"
             :class="{ '-flagged': i === goal.x && goal.y === 9 }">
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
             <template v-if="instruction === 0">↑</template>
             <template v-if="instruction === 1">⟲</template>
             <template v-if="instruction === 2">⟳</template>
             <button class="dt-way-out__instructions__delete-button"
                     aria-label="delete"
                     @click.stop="instructions.splice(index, 1)" v-if="(index > executionIndex) && !executing">✕</button>
           </div>
         </div>
       </div>
       <div class="dt-way-out__instructions__buttons">
         <button class="dt-button -outlined -green" :disabled="executing" @click="instructions.splice(0)">✕</button>
         <button class="dt-button -green" :disabled="instructions.length === 0 || executing" @click="executeInstructions()">➥</button>
       </div>
     </div>
     <div class="dt-way-out__commands">
       <button class="dt-button -outlined -green" :disabled="executing" @click="instructions.push(1)">⟲</button>
       <button class="dt-button -outlined -green" :disabled="executing" @click="instructions.push(0)">↑</button>
       <button class="dt-button -outlined -green" :disabled="executing" @click="instructions.push(2)">⟳</button>
     </div>
   </div>
   </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
import { computed, defineComponent, reactive, ref } from 'vue';
import PauseMenu from '@/components/GamesUI/PauseMenu/PauseMenu.vue';

import { Pawn, PawnInstruction, PawnOrientation } from '@/Model/FinTheWayOut';

export default defineComponent({
  name: 'NumberLink',
  components: { PauseMenu },
  events: { endGame: () => null },
  setup(_, { emit }) {
    const pawn: Pawn = reactive<Pawn>({ x: 0, y: 0, orientation: PawnOrientation.right });
    const instructions: PawnInstruction [] = reactive<PawnInstruction []>([]);
    const executionIndex = ref<number>(-1);
    const executing = ref<boolean>(false);
    const isReduced = ref<boolean>(false);
    const start = reactive<{ x: number, y: number }>({ x: 0, y: 0 });
    const goal = reactive<{ x: number, y: number }>({ x: 9, y: 9 });

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
      pawn.x = start.x;
      pawn.y = start.y;
      pawn.orientation = PawnOrientation.right;
    }

    function isGameOver(): void {
      if (pawn.x + 1 === goal.x && pawn.y + 1 === goal.y) {
        console.log('the game is over');
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

    return {
      pawn,
      instructions,
      executionIndex,
      getPawnStyle,
      goal,
      executeInstructions,
      executing,
      isReduced,
    };
  },
});
</script>
