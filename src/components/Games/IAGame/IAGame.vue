<script lang="ts">
import type { PropType, Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'IAGame',
  components: {},
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['skipGame', 'quitGame', 'endGame'],
  events: {
    skipGame: () => null,
    quitGame: () => null,
    endGame: () => null,
  },
  setup(_, { emit }) {
    const currentQuestion: Ref<number> = ref(0)
    const selectedAnswerIndex: Ref<number | null> = ref(null)
    let selectedAnswerIsCat: boolean | null = null
    const isNotCatError: Ref<boolean> = ref(false)
    const isNotAnswerError: Ref<boolean> = ref(false)

    const questions = [
      [
        {
          isCat: false,
          img: './img/IAGame/question1/bird.jpg',
        },
        {
          isCat: true,
          img: './img/IAGame/question1/cat.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question1/dog.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question1/fox.jpg',
        },
      ],
      [
        {
          isCat: true,
          img: './img/IAGame/question2/cat.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question2/deer.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question2/dolphin.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question2/hedgehog.jpg',
        },
      ],
      [
        {
          isCat: false,
          img: './img/IAGame/question3/elephant.jpg',
        },
        {
          isCat: true,
          img: './img/IAGame/question3/cat.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question3/rabbit.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question3/tiger.jpg',
        },
      ],
      [
        {
          isCat: false,
          img: './img/IAGame/question4/giraffe.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question4/sheep.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question4/squirrel.jpg',
        },
        {
          isCat: true,
          img: './img/IAGame/question4/cat.jpg',
        },
      ],
      [
        {
          isCat: false,
          img: './img/IAGame/question5/ape.jpg',
        },
        {
          isCat: true,
          img: './img/IAGame/question5/cat.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question5/owl.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question5/rooster.jpg',
        },
      ],
      [
        {
          isCat: false,
          img: './img/IAGame/question6/gecko.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question6/horse.jpg',
        },
        {
          isCat: true,
          img: './img/IAGame/question6/cat.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question6/kingfisher.jpg',
        },
      ],
      [
        {
          isCat: true,
          img: './img/IAGame/question7/cat.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question7/cow.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question7/frog.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question7/lemurs.jpg',
        },
      ],
      [
        {
          isCat: false,
          img: './img/IAGame/question8/otter.jpg',
        },
        {
          isCat: true,
          img: './img/IAGame/question8/cat.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question8/pelican.jpg',
        },
        {
          isCat: false,
          img: './img/IAGame/question8/pig.jpg',
        },
      ],
    ]

    function handleSkipGame(): void {
      emit('skipGame')
    }

    function handleQuitGame(): void {
      emit('quitGame')
    }

    function nextQuestion(): void {
      if (selectedAnswerIndex.value === null) {
        isNotAnswerError.value = true
      }
      else if (selectedAnswerIsCat === false) {
        isNotCatError.value = true
      }
      else {
        currentQuestion.value += 1
        selectedAnswerIndex.value = null
        selectedAnswerIsCat = null
      }
    }

    function selectAnswer(index: number, isCat: boolean): void {
      selectedAnswerIndex.value = index
      isNotCatError.value = false
      isNotAnswerError.value = false
      selectedAnswerIsCat = isCat
    }

    return {
      currentQuestion,
      questions,
      nextQuestion,
      handleSkipGame,
      handleQuitGame,
      selectAnswer,
      selectedAnswerIndex,
      isNotCatError,
      isNotAnswerError,
    }
  },
})
</script>

<template>
  <Game :color="islandInfos.color">
    <template #header>
      <PauseMenu :color="islandInfos.color" @skip="handleSkipGame()" @quit="handleQuitGame()" />
      <div class="dt-ia-header-title">
        <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
          Île {{ islandInfos.islandName }}
        </IslandTitle>
      </div>
      <p class="dt-ia-text dt-ia-subtitle">
        Aide Gustave à reconnaitre ses photos en répondant à la question suivante :
      </p>
      <h2 class="dt-ia-text dt-ia-question">
        Quelle image correspond à un chat ?
      </h2>
    </template>
    <template #content>
      <div class="dt-ia-img-container">
        <img
          v-for="(animal, index) in questions[currentQuestion]" :key="index" class="dt-ia-img"
          :class="{ 'dt-ia-img-selected': index === selectedAnswerIndex && !isNotCatError, 'dt-ia-img-error': index === selectedAnswerIndex && isNotCatError }"
          :src="animal.img" alt="animal" width="200" @click="selectAnswer(index, animal.isCat)"
        >
      </div>
      <div v-if="isNotCatError || isNotAnswerError" class="dt-ia-gustave-bubble">
        <img class="dt-ia-gustave" src="@/assets/img/Gustave/gustave_head.png">
        <div class="dt-ia-bubble">
          <template v-if="isNotCatError">
            Je reconnais, ce n'est pas un chat !
          </template>
          <template v-if="isNotAnswerError">
            Tu ne veux pas m'aider en sélectionnant le chat ?
          </template>
          <div class="dt-ia-bubble-left" />
        </div>
      </div>
    </template>
    <template #footer>
      <DTButton class="dt-ia-confirm-button" :color="islandInfos.color" @click="nextQuestion()">
        Valider
      </DTButton>
    </template>
  </Game>
</template>

<style lang="scss">
.dt-ia {
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
    font-size: 18px;
  }

  &-question {
    margin-top: 40px;
  }

  &-confirm-button {
    margin-bottom: 1.5rem;
  }

  &-img-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 20px;
  }

  &-img {
    border: solid white 6px;
    border-radius: 20px;
    aspect-ratio: 1;
    object-fit: cover;
    cursor: pointer;
  }

  &-img-selected {
    border-color: #63d045;
  }

  &-img-error {
    border-color: #dc3838;
  }

  &-gustave {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  &-gustave-bubble {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 40px 10px;
  }

  &-bubble {
    height: 100px;
    width: 250px;
    background-color: white;
    position: relative;
    border-radius: 20px;
    margin-left: 30px;
    padding: 20px;
    font-weight: bold;
    color: #dc3838;
  }

  &-bubble-left {
    width: 0;
    height: 0;
    border-left: 2vh solid transparent;
    border-right: 2vh solid transparent;
    border-top: 10vh solid white;
    position: absolute;
    top: 20px;
    left: -5px;
    transform: rotate(90deg);
    z-index: -1;
  }
}
</style>
