<script lang="ts">
import type { PropType, Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import questions from '@/components/Games/IAGame/questions'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import GustaveBubble from '@/components/Games/IAGame/GustaveBubble.vue'

export default defineComponent({
  name: 'IAGameTrainingStep',
  components: { GustaveBubble },
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['nextStep'],
  events: {
    nextStep: () => null,
  },
  setup(_, { emit }) {
    const currentQuestion = ref(0)
    const selectedAnswerIndex: Ref<number | null> = ref(null)
    let selectedAnswerIsCat: boolean | null = null
    const isNotCatError = ref(false)
    const isNotAnswerError = ref(false)

    function nextQuestion(): void {
      if (selectedAnswerIndex.value === null) {
        isNotAnswerError.value = true
      }
      else if (selectedAnswerIsCat === false) {
        isNotCatError.value = true
      }
      else if (currentQuestion.value + 1 === questions.length) {
        emit('nextStep')
      }
      else {
        currentQuestion.value += 1
        selectedAnswerIndex.value = null
        selectedAnswerIsCat = null
      }
    }

    function selectAnswer(index: number): void {
      selectedAnswerIndex.value = index
      isNotCatError.value = false
      isNotAnswerError.value = false
      selectedAnswerIsCat = questions[currentQuestion.value][index].isCat
    }

    return {
      currentQuestion,
      questions,
      nextQuestion,
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
          :src="animal.img" alt="animal" @click="selectAnswer(index, animal.isCat)"
        >
      </div>
      <GustaveBubble v-if="isNotCatError" error>
        Es-tu sûr que c'est une photo d'un chat ?
      </GustaveBubble>
      <GustaveBubble v-if="isNotAnswerError" error>
        Tu ne veux pas m'aider en sélectionnant le chat ?
      </GustaveBubble>
    </template>
    <template #footer>
      <div class="dt-ia-action-container">
        <DTButton class="dt-ia-confirm-button" :color="islandInfos.color" @click="nextQuestion()">
          Valider
        </DTButton>
      </div>
    </template>
  </Game>
</template>

<style lang="scss" scoped>
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
    font-size: 1.1rem;
  }

  &-question {
    margin-top: 1.1rem;
  }

  &-action-container {
    margin: 0 10px;
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
    width: 100%;
  }

  &-img-selected {
    border-color: #63d045;
  }

  &-img-error {
    border-color: #dc3838;
  }
}
</style>