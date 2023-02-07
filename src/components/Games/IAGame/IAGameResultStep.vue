<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { Result } from '@/Model/Game/IAGame'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import GustaveAlert from '@/components/Games/IAGame/GustaveAlert.vue'

export default defineComponent({
  name: 'IAGameResultStep',
  components: { GustaveAlert },
  props: {
    islandInfos: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
  },
  emits: ['endGame'],
  setup(_, { emit }) {
    const currentResult = ref(0)
    const results: Result[] = [
      {
        title: 'Felix au concours de pêche 2018',
        img: '/img/IAGame/results/cat_1.png',
      },
      {
        title: 'Mimi à la finale de basket 2019',
        img: '/img/IAGame/results/cat_2.png',
      },
      {
        title: 'Sami en cuisine pour la fête de l\'île',
        img: '/img/IAGame/results/cat_3.png',
      },
    ]
    const isLastResult = computed(() => currentResult.value + 1 === results.length)

    function nextResult(): void {
      currentResult.value += 1
    }

    function collectGift(): void {
      emit('endGame')
    }

    return {
      results,
      nextResult,
      currentResult,
      collectGift,
      isLastResult,
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
    </template>
    <template #content>
      <p class="dt-ia-text">
        {{ results[currentResult].title }}
      </p>
      <img :src="results[currentResult].img" alt="photo d'un chat en action" class="dt-ia-img">
      <GustaveAlert v-if="isLastResult" without-animation>
        Pour te remercier, voici un objet étrange que j'ai trouvé sur l'île
      </GustaveAlert>
      <GustaveAlert v-else without-animation>
        Merci pour ton aide, voici les plus belles photos de ma collection !
      </GustaveAlert>
    </template>
    <template #footer>
      <div class="dt-ia-action-container">
        <DTButton v-if="!isLastResult" class="dt-ia-button" :color="islandInfos.color" @click="nextResult()">
          Suivant
        </DTButton>
        <DTButton v-else class="dt-ia-button" :color="islandInfos.color" @click="collectGift()">
          Récupérer le cadeau
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
    margin: 10px;
    font-weight: bold;
    font-size: 1.1rem;
  }

  &-img {
    border: solid white 6px;
    border-radius: 20px;
    max-width: 90%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  &-action-container {
    margin: 0 10px;
  }

  &-button {
    margin-bottom: 1.5rem;
  }
}
</style>
