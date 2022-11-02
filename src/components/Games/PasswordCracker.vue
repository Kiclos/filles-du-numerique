<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import AmstramgramPost from '@/components/Games/GamesUI/PasswordCracker/AmstramgramPost.vue'
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue'

export default defineComponent({
  name: 'PasswordCracker',
  components: { AmstramgramPost, PauseMenu },
  emits: ['skipGame', 'quitGame', 'endGame'],
  events: {
    skipGame: () => null,
    quitGame: () => null,
    endGame: () => null,
  },
  setup(_, { emit }) {
    function isGameOver(): void {
      if (false)
        emit('endGame')
    }

    function handleSkipGame(): void {
      emit('skipGame')
    }

    function handleQuitGame(): void {
      emit('quitGame')
    }

    onMounted(() => {

    })

    return {
      handleSkipGame,
      handleQuitGame,
    }
  },
})
</script>

<template>
  <div class="dt-password-cracker__container blue-bg">
    <PauseMenu color="blue" @skip="handleSkipGame()" @quit="handleQuitGame()" />
    <div class="dt-password-cracker__interface">
      <div class="main-container">
        <div class="segura-header">
          <span class="dt-island__title"><span class="icon-">!</span>Île Segura</span>
          <div><span>Clyde, un habitant de l’île a oublié son mot de passe, il est très simple. Tu devrais pouvoir le retrouver grâce à son profil instagram.</span></div>
        </div>
        <div class="amstramgram-container">
          <AmstramgramPost />
        </div>
        <div class="password-container">
          <button class="dt-button -blue">
            Essayer un mot de passe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.password-container {
}
.segura-header {
  flex-direction: column;
  text-align: center;
  gap: 22px;
}
.main-container {
  display: grid;
  grid-template-rows: 180px auto 80px;
  width: 100%;
  height: 100vh;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.blue-bg {
  background: linear-gradient(100deg, #0093E9 -6.84%, #80D0C7 124.14%);
}
.amstramgram-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: black;
  overflow-y: scroll;

}
.dt-password-cracker {
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
  &__interface {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 500px;
  }
}
</style>
