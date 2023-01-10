<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue'

import type { Pawn } from '@/Model/Game/FindTheWayOut'
import { PawnInstruction, PawnOrientation } from '@/Model/Game/FindTheWayOut'

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
    const pawn: Pawn = reactive<Pawn>({ x: 0, y: 0, orientation: PawnOrientation.right })
    const instructions: PawnInstruction [] = reactive<PawnInstruction []>([])
    const executionIndex = ref<number>(-1)
    const executing = ref<boolean>(false)
    const isReduced = ref<boolean>(false)
    const start = reactive<Pawn>({ x: 0, y: 0, orientation: PawnOrientation.right })
    const goal = reactive<{ x: number; y: number }>({ x: 10, y: 10 })

    const getPawnStyle = computed(() => ({ top: `${pawn.y * 10}%`, left: `${pawn.x * 10}%` }))

    function goForward(): void {
      switch (pawn.orientation) {
        case PawnOrientation.top:
          pawn.y = pawn.y > 0 ? pawn.y - 1 : pawn.y
          break
        case PawnOrientation.bottom:
          pawn.y = pawn.y < 9 ? pawn.y + 1 : pawn.y
          break
        case PawnOrientation.left:
          pawn.x = pawn.x > 0 ? pawn.x - 1 : pawn.x
          break
        case PawnOrientation.right:
          pawn.x = pawn.x < 9 ? pawn.x + 1 : pawn.x
          break
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
      if (pawn.x + 1 === goal.x && pawn.y + 1 === goal.y)
        emit('endGame')
    }

    function executeInstruction(instruction: PawnInstruction): void {
      switch (instruction) {
        case PawnInstruction.moveForward:
          goForward()
          break
        case PawnInstruction.rotateRight:
          rotateRight()
          break
        case PawnInstruction.rotateLeft:
          rotateLeft()
          break
      }
    }

    function executeInstructions(): void {
      reset()
      isReduced.value = true
      executing.value = true
      const execution = setInterval(() => {
        if (executionIndex.value === instructions.length - 1) {
          executing.value = false
          clearInterval(execution)
          isGameOver()
          executionIndex.value = -2
        }
        executionIndex.value += 1
        executeInstruction(instructions[executionIndex.value])
      }, 500)
    }

    function generateRandomGame(): void {
      const startX = Math.round(Math.random() * 9)
      const startY = Math.round(Math.random() * 9)
      const startOrientation = Object.values(PawnOrientation)[Math.round(Math.random() * 3)]
      let goalX
      let goalY
      let distance = 0
      do {
        goalX = Math.round(Math.random() * 9) + 1
        goalY = Math.round(Math.random() * 9) + 1
        distance = Math.sqrt((goalX - (startX + 1)) ** 2 + (goalY - (startY + 1)) ** 2)
      } while (distance < 7)
      Object.assign(start, { x: startX, y: startY, orientation: startOrientation })
      Object.assign(goal, { x: goalX, y: goalY })
      reset()
    }

    function handleSkipGame(): void {
      emit('skipGame')
    }

    function handleQuitGame(): void {
      emit('quitGame')
    }

    onMounted(() => {
      generateRandomGame()
    })

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
    }
  },
})
</script>

<template>
  <div class="dt-way-out__container">
    <PauseMenu color="green" @skip="handleSkipGame()" @quit="handleQuitGame()" />
    <div class="dt-way-out__content">
      <div class="dt-way-out__pawn" :class="`-${pawn.orientation}`" :style="getPawnStyle" />
      <div v-for="i in 10" :key="`row-${i}`" class="dt-way-out__row">
        <div
          v-for="j in 10" :key="`square-${j}`"
          class="dt-way-out__square"
          :class="{ '-flagged': j === goal.x && i === goal.y }"
        />
      </div>
    </div>
    <div class="dt-way-out__interface">
      <div class="dt-way-out__instructions__container">
        <div class="dt-way-out__instructions" :class="{ '-reduced': isReduced }">
          <button v-if="instructions.length > 0" class="dt-way-out__instructions__reduced" @click="isReduced = !isReduced">
            {{ isReduced ? 'Agrandir' : 'Réduire' }}
          </button>
          <div class="dt-way-out__instructions__content">
            <div v-if="instructions.length === 0" class="dt-way-out__instructions__none">
              Cliquez sur une instruction pour commencer
            </div>
            <div
              v-for="(instruction, index) in instructions"
              :key="instruction"
              class="dt-button -green"
              :class="[{ '-text': index < executionIndex }, { '-outlined': index > executionIndex }, { '-disabled': executing }]"
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
            </div>
          </div>
        </div>
        <div class="dt-way-out__instructions__buttons">
          <DTButton color="green" outlined :disabled="executing" @click="clear()">
            <span class="icon-close" />
          </DTButton>
          <DTButton color="green" :disabled="instructions.length === 0 || executing" @click="executeInstructions()">
            <span class="icon-play_arrow" />
          </DTButton>
        </div>
      </div>
      <div class="dt-way-out__commands">
        <DTButton color="green" outlined :disabled="executing" @click="instructions.push(1)">
          <span class="icon-rotate_left" />
        </DTButton>
        <DTButton color="green" outlined :disabled="executing" @click="instructions.push(0)">
          <span class="icon-north" />
        </DTButton>
        <DTButton color="green" outlined :disabled="executing" @click="instructions.push(2)">
          <span class="icon-rotate_right" />
        </DTButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$square-size: 10%;

.dt-way-out {
  &__container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: $white;
    z-index: 2;
  }

  &__content {
    @media only screen and (max-width: 1024px) {
      /* tablettes et ordinateurs */
      height: 50rem;
      width: 40rem;
    }
    @media only screen and (max-width: 767px) {
      /* smartphone */
      height: 50rem;
      width: 30rem;
    }
    @media only screen and (max-width: 767px) and (orientation: portrait) {
      /* smartphone en mode portait */
      height: 20rem;
      width: 20rem
    }
    @media only screen and (max-width: 600px) {
      height: 15rem;
      width: 15rem
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    height: 50rem;
    width: 50rem;
    transform: rotateX(-60deg) rotateY(0deg) rotateZ(45deg);
    box-shadow: 12px 12px darken($light-grey, 10%), 11px 11px darken($light-grey, 10%), 10px 10px darken($light-grey, 1%),
    9px 9px darken($light-grey, 10%), 8px 8px darken($light-grey, 10%), 7px 7px darken($light-grey, 10%),
    6px 6px darken($light-grey, 10%), 5px 5px darken($light-grey, 10%), 4px 4px darken($light-grey, 10%),
    3px 3px darken($light-grey, 10%), 2px 2px darken($light-grey, 10%), 1px 1px darken($light-grey, 10%);
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
    height: 100%;
    width: $square-size;
    background-color: $light-grey;
    border-top: 2px solid $white;
    border-left: 2px solid $white;

    &:last-child {
      border-right: 2px solid $white;
    }

    &.-flagged {

      &:after {
        @media only screen and (max-width: 767px) {
          /* smartphone */
          font-size: 2rem;
        }
        @media only screen and (max-width: 767px) and (orientation: portrait) {
          /* smartphone en mode portait */
          font-size: 1.5rem;
        }
        @media only screen and (max-width: 600px) {
          font-size: 1rem;
        }
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        content: "⬤";
        color: rgba($white, .8);
        font-size: 2.5rem;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: linear-gradient(95.43deg, lighten($light-green, 10%) -6.84%, lighten($yellow, 10%) 124.14%);
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
      @media only screen and (max-width: 767px) {
        /* smartphone */
        font-size: 2rem;
      }
      @media only screen and (max-width: 767px) and (orientation: portrait) {
        /* smartphone en mode portait */
        font-size: 1.5rem;
      }
      @media only screen and (max-width: 600px) {
        font-size: 1rem;
      }
      position: absolute;
      top: 50%;
      left: 50%;
      content: "⬤";
      font-size: 2.5rem;
      color: lighten($light-green, 10%);
      transform: translate(-50%, -50%);
      text-shadow: 3px 3px rgba($black, .25), 2px 2px rgba($black, .25), 1px 1px rgba($black, .75);
      z-index: 1;
    }

    &:before {
      @media only screen and (max-width: 767px) {
        /* smartphone */
        font-size: 1.5rem;
      }
      @media only screen and (max-width: 767px) and (orientation: portrait) {
        /* smartphone en mode portait */
        font-size: 1rem;
      }
      @media only screen and (max-width: 600px) {
        font-size: .75rem;
      }
      position: absolute;
      top: 50%;
      left: 50%;
      content: '➤';
      font-size: 2rem;
      color: $white;
      transform: translate(-50%, -50%);
      transition: .3s;
      z-index: 2;
    }

    &.-top:before {
      transform: translate(-50%, -50%) rotateZ(-90deg);
    }

    &.-right:before {
      transform: translate(-45%, -45%) rotateZ(0deg);
    }

    &.-bottom:before {
      transform: translate(-55%, -40%) rotateZ(90deg);
    }

    &.-left:before {
      transform: translate(-60%, -45%) rotateZ(180deg);
    }
  }

  &__interface {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }

  &__instructions {
    @media only screen and (max-width: 767px) {
      bottom: calc(100% + 1rem);
    }
    overflow: hidden;
    position: absolute;
    bottom: -.5rem;
    left: 0;
    border-radius: 1rem;
    padding: 1rem .5rem 0 .5rem;
    background-color: rgba(lighten($light-green, 40%), .75);

    &__container {
      @media only screen and (max-width: 767px) {
        padding-left: 0;
        width: calc(100% - 2rem);
        justify-content: center;
        margin-bottom: 0;
      }
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0 2rem;
      padding-left: calc(50vw + 1rem);
      z-index: 100!important;
    }

    &__content {
      @media only screen and (max-width: 767px) {
        width: 100%;
      }
      width: 50vw;
      max-height: 60vh;
      max-height: calc(var(--vh, 1vh) * 60);
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      overflow: scroll;
      transition: .5s;
    }

    .dt-button.-disabled {
      pointer-events: none;
    }

    &.-reduced .dt-way-out__instructions__content {
      overflow: hidden;
      max-height: 6rem;
    }

    &__reduced {
      position: absolute;
      top: 0;
      right: 0;
      padding: .25rem .75rem .25rem .5rem;
      border-top: none;
      border-right: none;
      border-left: 2px solid $light-green;
      border-bottom: 2px solid $light-green;
      border-bottom-left-radius: 5px;
      background-color: lighten($light-green, 40%);
      color: $light-green;
      font-size: .8rem;
      cursor: pointer;
      z-index: 1;
      transition: .3s;

      &:hover {
        background: $light-green;
        color: lighten($light-green, 50%)
      }

      &:active {
        background: darken($light-green, 10%);
        color: lighten($light-green, 50%)
      }
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
      color: $light-green;
      white-space: nowrap;
      width: 100%;
    }

    .dt-button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      font-size: 2rem;
      text-align: center;
      margin: 1rem .5rem;
      white-space: nowrap;
      cursor: move;
      height: 4rem;
      width: auto;
      overflow: hidden;
      border: 2px solid $white;

      &.-text {
        background: rgba($green, 0.1);
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
      background-color: $light-green;
      color: $white;
      border: none;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 13px;
      cursor: pointer!important;
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

    .dt-button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      text-align: center;
      margin: 0 1rem;
      white-space: nowrap;
    }
  }
}
</style>
