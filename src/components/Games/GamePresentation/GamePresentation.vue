<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import IslandTitle from '@/components/Islands/IslandTitle.vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'GameResults',
  components: { IslandTitle },
  props: {
    content: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  emits: ['startGame', 'backToMap', 'skipGame'],
  events: {
    startGame: () => null,
    backToMap: () => null,
    skipGame: () => null,
  },
  setup(props, { emit }) {
    const getButtonText = computed(() => {
      if (props.status === 3)
        return 'Consulter la ficher métier'

      if (props.content.hasGame)
        return 'Commencer le jeu'

      return 'Collecter la pièce'
    })

    function handleStartGame(): void {
      emit('startGame')
    }

    function handleBackTopMap(): void {
      emit('backToMap')
    }

    function handleSkipGame(): void {
      emit('skipGame')
    }

    return {
      getButtonText,
      handleStartGame,
      handleBackTopMap,
      handleSkipGame,
    }
  },
})
</script>

<template>
  <Game :color="content.color">
    <template #header>
      <StepButton :color="content.color" back @click="handleBackTopMap()" />
      <StepButton :color="content.color" next @click="handleSkipGame()">
        Passer <br>le mini jeu
      </StepButton>
    </template>
    <template #content>
      <div :class="`island-icon island-icon-${content.color}`" :aria-label="content.img" />
      <IslandTitle :checked="status > 1" :color="content.color" :name="content.islandName">
        Île {{ content.islandName }}
      </IslandTitle>
      <p class="island-description">
        {{ content.presentation }}<br><br>
        {{ content.guideline }}
      </p>
    </template>
    <template #footer>
      <div class="island-start-button">
        <DTButton :color="content.color" @click="handleStartGame()">
          {{ getButtonText }}
        </DTButton>
      </div>
    </template>
  </Game>
</template>

<style lang="scss">
.island-icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  height: 10rem;
  width: 10rem;
  background-color: rgba($white, .25);
  border-radius: 5rem;

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}

.island-icon-blue:after {
  background: url('../../../assets/img/icon/shield.png') center center no-repeat;
  background-size: 60%;
}

.island-icon-green:after {
  background: url('../../../assets/img/icon/software.png') center center no-repeat;
  background-size: 60%;
}

.island-icon-purple:after {
  background: url('../../../assets/img/icon/planet.png') center center no-repeat;
  background-size: 60%;
}

.island-icon-purple-blue:after {
  background: url('../../../assets/img/icon/calculator.png') center center no-repeat;
  background-size: 60%;
}

.island-icon-red:after {
  background: url('../../../assets/img/icon/robot.png') center center no-repeat;
  background-size: 60%;
}

.island-icon-yellow:after {
  background: url('../../../assets/img/icon/tools.png') center center no-repeat;
  background-size: 60%;
}

.island-description {
  overflow-y: auto;
}

.island-start-button {
  padding: .75rem 1.5rem 1.5rem 1.5rem;
  background-color: $white;
  border-radius: 1.5rem 1.5rem 0 0;
}
</style>
