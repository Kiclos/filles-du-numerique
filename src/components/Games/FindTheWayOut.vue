<template>
  <div class="dt-number-link__content">
    <PauseMenu color="green"/>
    <div class="dt-way-out__container">
      <div class="dt-way-out__pawn" :class="`-${pawn.orientation}`" :style="getPawnStyle"></div>
      <div v-for="i in 10" :key="`row-${i}`" class="dt-way-out__row">
        <div v-for="j in 10" :key="`square-${j}`"
             class="dt-way-out__square"
             :class="{ '-flagged': i === 9 && j === 9 }">
        </div>
      </div>
    </div>
    <div class="dt-way-out__commands">
      <button class="dt-button -outlined -green" @click="rotateLeft()">⟲</button>
      <button class="dt-button -green" @click="goForward()">↑</button>
      <button class="dt-button -outlined -green" @click="rotateRight()">⟳</button>
      <button class="dt-button -text -green" @click="reset()">✕</button>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
import { computed, defineComponent, reactive } from 'vue';
import PauseMenu from '@/components/GamesUI/PauseMenu/PauseMenu.vue';

export default defineComponent({
  name: 'NumberLink',
  components: { PauseMenu },
  events: { endGame: () => null },
  setup() {
    // eslint-disable-next-line no-shadow
    enum PawnOrientation {
      top = 'top',
      left = 'left',
      right = 'right',
      bottom = 'bottom',
    }

    interface Pawn {
      x: number,
      y: number,
      orientation: PawnOrientation,
    }

    const pawn: Pawn = reactive<Pawn>({ x: 0, y: 0, orientation: PawnOrientation.right });

    const getPawnStyle = computed(() => ({ top: `${pawn.y * 4}rem`, left: `${pawn.x * 4}rem` }));

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
      pawn.x = 0;
      pawn.y = 0;
      pawn.orientation = PawnOrientation.right;
    }

    return {
      pawn,
      getPawnStyle,
      goForward,
      rotateRight,
      rotateLeft,
      reset,
    };
  },
});
</script>
