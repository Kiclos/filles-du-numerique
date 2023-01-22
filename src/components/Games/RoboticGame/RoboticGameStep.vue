<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import { mazes } from '@/components/Games/RoboticGame/mazes'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

import type { Pawn } from '@/Model/Game/FindTheWayOut'
import { PawnInstruction, PawnOrientation } from '@/Model/Game/FindTheWayOut'

export default defineComponent({
  name: 'NumberLink',
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['nextStep'],
  setup(_, { emit }) {
    const pawn: Pawn = reactive<Pawn>({
      x: 0,
      y: 0,
      orientation: PawnOrientation.right,
    })
    const instructions: PawnInstruction [] = reactive<PawnInstruction []>([])
    const executionIndex = ref<number>(-1)
    const executing = ref<boolean>(false)
    const isReduced = ref<boolean>(false)
    const start = reactive<Pawn>({
      x: 0,
      y: 0,
      orientation: PawnOrientation.right,
    })
    const goal = reactive<{ x: number; y: number }>({
      x: 10,
      y: 10,
    })

    const grid: number[][] = new Array(10).fill(null).map(() => new Array(10).fill(1))

    const getPawnStyle = computed(() => ({
      top: `${pawn.y * 10}%`,
      left: `${pawn.x * 10}%`,
    }))

    function goForward(): boolean {
      switch (pawn.orientation) {
        case PawnOrientation.top:
          if (pawn.y > 0 && grid[pawn.y - 1][pawn.x] === 0) {
            pawn.y = pawn.y - 1
            return true
          }
          return false
        case PawnOrientation.bottom:
          if (pawn.y < 9 && grid[pawn.y + 1][pawn.x] === 0) {
            pawn.y = pawn.y + 1
            return true
          }
          return false
        case PawnOrientation.left:
          if (pawn.x > 0 && grid[pawn.y][pawn.x - 1] === 0) {
            pawn.x = pawn.x - 1
            return true
          }
          return false
        case PawnOrientation.right:
          if (pawn.x < 9 && grid[pawn.y][pawn.x + 1] === 0) {
            pawn.x = pawn.x + 1
            return true
          }
          return false
      }
    }

    function rotateLeft(): void {
      switch (pawn.orientation) {
        case PawnOrientation.top:
          pawn.orientation = PawnOrientation.left
          break
        case PawnOrientation.bottom:
          pawn.orientation = PawnOrientation.right
          break
        case PawnOrientation.left:
          pawn.orientation = PawnOrientation.bottom
          break
        case PawnOrientation.right:
          pawn.orientation = PawnOrientation.top
          break
      }
    }

    function rotateRight(): void {
      switch (pawn.orientation) {
        case PawnOrientation.top:
          pawn.orientation = PawnOrientation.right
          break
        case PawnOrientation.bottom:
          pawn.orientation = PawnOrientation.left
          break
        case PawnOrientation.left:
          pawn.orientation = PawnOrientation.top
          break
        case PawnOrientation.right:
          pawn.orientation = PawnOrientation.bottom
          break
      }
    }

    function reset(): void {
      Object.assign(pawn, start)
    }

    function clear(): void {
      reset()
      instructions.splice(0)
    }

    function isGameOver(): void {
      if (pawn.x === goal.x && pawn.y === goal.y)
        emit('nextStep')
    }

    function executeInstruction(instruction: PawnInstruction): boolean {
      switch (instruction) {
        case PawnInstruction.moveForward:
          return goForward()
        case PawnInstruction.rotateRight:
          rotateRight()
          return true
        case PawnInstruction.rotateLeft:
          rotateLeft()
          return true
      }
    }

    function executeInstructions(): void {
      reset()
      isReduced.value = true
      executing.value = true
      let stopExecution = false
      const execution = setInterval(() => {
        if (stopExecution || executionIndex.value === instructions.length - 1) {
          executing.value = false
          clearInterval(execution)
          isGameOver()
          reset()
          executionIndex.value = -1
        }
        else {
          executionIndex.value += 1
          stopExecution = !executeInstruction(instructions[executionIndex.value])
        }
      }, 500)
    }

    function generateRandomGame(): void {
      const maze = mazes[Math.round(Math.random() * 5)]
      Object.assign(start, {
        x: maze.start[0],
        y: maze.start[1],
        orientation: maze.startOrientation,
      })
      Object.assign(goal, {
        x: maze.goal[0],
        y: maze.goal[1],
      })
      Object.assign(grid, maze.grid)
      reset()
    }

    onMounted(() => {
      generateRandomGame()
    })

    async function addInstruction(id: number) {
      instructions.push(id)
      await nextTick()
      const list = document.getElementById('instructions_list')
      if (list)
        list.scrollTop = list.scrollHeight
    }

    return {
      grid,
      pawn,
      instructions,
      executionIndex,
      getPawnStyle,
      goal,
      executeInstructions,
      clear,
      executing,
      isReduced,
      addInstruction,
    }
  },
})
</script>

<template>
  <Game :color="islandInfos.color">
    <template #header>
      <div class="dt-way-out-header-title">
        <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
          Île {{ islandInfos.islandName }}
        </IslandTitle>
      </div>
      <p class="dt-way-out-text dt-way-out-subtitle">
        Aide Julie, la responsable du CDI à brancher les nouveaux câbles en cliquant sur les cases
        les unes après les autres.
      </p>
    </template>
    <template #content>
      <div class="dt-way-out__container">
        <div class="dt-way-out__content">
          <div class="dt-way-out__pawn" :class="`-${pawn.orientation}`" :style="getPawnStyle" />
          <div v-for="(line, i) in grid" :key="`row-${i}`" class="dt-way-out__row">
            <div
              v-for="(column, j) in line" :key="`square-${j}`"
              class="dt-way-out__square"
              :class="{ '-flagged': j === goal.x && i === goal.y, '-wall': column === 1 }"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="dt-way-out__interface">
        <div id="instructions_list" class="dt-way-out__instructions">
          <div v-if="instructions.length === 0" class="dt-way-out__instructions__none">
            Cliquez sur une instruction pour commencer
          </div>
          <DTButton
            v-for="(instruction, index) in instructions"
            :key="instruction"
            :color="islandInfos.color"
            :disabled="executing"
            :outlined="index > executionIndex"
          >
            <template v-if="instruction === 0">
              <span class="icon-north" />
            </template>
            <template v-if="instruction === 1">
              <span class="icon-rotate_left" />
            </template>
            <template v-if="instruction === 2">
              <span class="icon-rotate_right" />
            </template>
            <button
              v-if="(index > executionIndex) && !executing"
              class="dt-way-out__instructions__delete-button"
              aria-label="delete" @click.stop="instructions.splice(index, 1)"
            >
              ✕
            </button>
          </DTButton>
        </div>
        <div class="dt-way-out__commands">
          <DTButton :color="islandInfos.color" :disabled="executing" @click="addInstruction(1)">
            <span class="icon-rotate_left" />
          </DTButton>
          <DTButton :color="islandInfos.color" :disabled="executing" @click="addInstruction(0)">
            <span class="icon-north" />
          </DTButton>
          <DTButton :color="islandInfos.color" :disabled="executing" @click="addInstruction(2)">
            <span class="icon-rotate_right" />
          </DTButton>
          <DTButton
            :color="islandInfos.color" :disabled="instructions.length === 0 || executing"
            @click="executeInstructions()"
          >
            <span class="icon-play_arrow" />
          </DTButton>
        </div>
      </div>
    </template>
  </Game>
</template>

<style lang="scss">
$square-size: 10%;

.dt-way-out {
  &-header-title {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  &-text {
    color: white;
    text-align: center;
  }

  &-subtitle {
    font-size: 1.1rem;

    @media (max-width: 1024px) { /* TABLET */
      font-size: 1rem;
    }
  }

  &__container {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    transform: rotateX(-60deg) rotateY(0deg) rotateZ(45deg);
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $square-size;
    width: 10 * $square-size;

    &:last-child .dt-way-out__square {
      border-bottom: 2px solid $white;
    }
  }

  &__square {
    position: relative;
    display: block;
    width: $square-size;
    aspect-ratio: 1;
    background-color: $light-grey;
    border-top: 2px solid $white;
    border-left: 2px solid $white;

    &:last-child {
      border-right: 2px solid $white;
    }

    &.-wall {
      background-color: #a03253;
    }

    &.-flagged {

      &:after {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        content: "⬤";
        color: rgba($white, .8);
        top: 0;
        left: 0;
        width: 100%;
        aspect-ratio: 1;
        background: linear-gradient(100deg, desaturate($red, 25%) -6.84%, desaturate($dark-pink, 10%) 124.14%);
        box-shadow: 3px 3px rgba($black, .25), 2px 2px rgba($black, .5), 1px 1px rgba($black, .75);
        z-index: 1;
      }
    }
  }

  &__pawn {
    position: absolute;
    width: $square-size;
    height: $square-size;
    transition: .5s;
    z-index: 2;

    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: "⬤";
      font-size: 2rem;
      color: lighten($dark-red, 10%);
      transform: translate(-50%, calc(-50% - 4px));
      text-shadow: 3px 3px rgba($black, .25), 2px 2px rgba($black, .25), 1px 1px rgba($black, .75);
      z-index: 1;
    }

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      content: '➤';
      font-size: 1.5rem;
      color: $white;
      transform: translate(-50%, calc(-50% - 4px));
      transition: .3s;
      z-index: 2;

      @media only screen and (max-width: 500px) {
        font-size: 1rem;
      }
    }

    &.-top:before {
      transform: translate(-50%, -50%) rotateZ(-90deg);
    }

    &.-right:before {
      transform: translate(-50%, calc(-50% - 4px)) rotateZ(0deg);
    }

    &.-bottom:before {
      transform: translate(-50%, -50%) rotateZ(90deg);
    }

    &.-left:before {
      transform: translate(-50%, -50%) rotateZ(180deg);
    }
  }

  &__interface {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
  }

  &__instructions {
    overflow: hidden;
    padding: 10px;
    background-color: white;
    width: 100%;
    max-height: 6rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: scroll;
    transition: .5s;

    .dt-button.-disabled {
      pointer-events: none;
    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: center;

      .dt-button {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-size: 2rem;
        text-align: center;
        margin-left: 1rem;
        width: 5rem;
      }
    }

    &__none {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 4rem;
      margin: 1rem;
      padding-bottom: 1rem;
      color: $dark-red;
      white-space: nowrap;
      width: 100%;
    }

    .dt-button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      text-align: center;
      margin: 5px;
      white-space: nowrap;
      cursor: move;
      height: 4rem;
      width: auto;
      overflow: hidden;
      border: 2px solid $white;

      &.-text {
        background: rgba($dark-red, 0.1);
        border: 2px solid transparent;
      }

      &:hover {
        border-color: desaturate($red, 10%);

        .dt-way-out__instructions__delete-button {
          height: 100%;
          width: 100%;
          border-radius: 5px;
          background-color: desaturate($red, 15%);
        }
      }
    }

    &__delete-button {
      position: absolute;
      top: 0;
      right: 0;
      height: 1.5rem;
      width: 1.5rem;
      font-size: 1rem;
      background-color: $dark-red;
      color: $white;
      border: none;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 13px;
      cursor: pointer !important;
      z-index: 1;
      transition: .3s;

      &:active {
        background-color: darken(desaturate($red, 15%), 10%);
      }
    }
  }

  &__commands {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1rem;
    gap: 1rem;
    flex-direction: row;
    flex-wrap: wrap;

    .dt-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      text-align: center;
      white-space: nowrap;
      width: fit-content;
    }
  }
}
</style>
