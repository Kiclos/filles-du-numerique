<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import type { Post } from '@/components/Games/GamesUI/PasswordCracker/AmstramgramPost.vue'
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
    const ROOT_ASSETS = '/src/assets/img/PasswordCracker/'
    const defaultUser: Partial<Post> & { username: string; profilePicUrl: string } = {
      username: 'clyde.le.goat',
      profilePicUrl: `${ROOT_ASSETS}pessi.jpg`,
    }
    const posts: Post[] = [
      {
        ...defaultUser,
        description: 'Ace, mon âme soeur ❤',
        imageUrl: `${ROOT_ASSETS}dog-g9104dfa66_1280.jpg`,
        numberOfLikes: 3602,
        date: 'Il y a 8 heures',
      },
      {
        ...defaultUser,
        description: 'Au concert de Dua Lipa à Stockholm 🇸🇪',
        imageUrl: `${ROOT_ASSETS}dua-lipa-gf9a9ff077_1280.jpg`,
        numberOfLikes: 1856,
        date: 'Il y a 4 jours',
      },
      {
        ...defaultUser,
        description: '❤',
        imageUrl: `${ROOT_ASSETS}dog-ge146353c0_1280.jpg`,
        numberOfLikes: 4202,
        date: 'Il y a 2 semaines',
      },
      {
        ...defaultUser,
        description: '#Rando #MontBlanc',
        imageUrl: `${ROOT_ASSETS}snow-gbb3a5897e_1280.jpg`,
        numberOfLikes: 1925,
        date: 'Il y a 1 mois',
      },
      {
        ...defaultUser,
        description: 'Déjà 1 an 12/07/2021 ❤',
        imageUrl: `${ROOT_ASSETS}dog-g464505e82_1280.jpg`,
        numberOfLikes: 4523,
        date: 'Il y a 4 mois',
      },
      {
        ...defaultUser,
        description: 'De retour dans la meilleure ville 🇫🇷',
        imageUrl: `${ROOT_ASSETS}1667919328125.jpg`,
        numberOfLikes: 7899,
        date: 'Il y a 6 mois',
      },
    ]
    function handleEndGame(): void {
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
      handleEndGame,
      posts,
    }
  },
})
</script>

<template>
  <PauseMenu color="blue" @skip="handleSkipGame()" @quit="handleQuitGame()" />
  <Game color="blue">
    <template #header>
      <div class="segura-header">
        <div class="segura-title">
          <IslandTitle color="blue" name="Segura">
            Île Segura
          </IslandTitle>
        </div>
        <div><span>Clyde, un habitant de l’île a oublié son mot de passe, il est très simple. Tu devrais pouvoir le retrouver grâce à son profil instagram.</span></div>
      </div>
    </template>
    <template #content>
      <div class="amstramgram-container">
        <AmstramgramPost v-for="(post, index) in posts" :key="index" :post="post" />
      </div>
    </template>
    <template #footer>
      <PasswordChecker @passwordFound="handleEndGame()" />
    </template>
    <div class="dt-password-cracker__container blue-bg">
      <div class="dt-password-cracker__interface" />
    </div>
  </Game>
</template>

<style lang="scss">
.segura-header {
  flex-direction: column;
  text-align: center;
  gap: 22px;
  padding-top: 30px;
}
.segura-title {
  display: inline-block;
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
  border-radius: 15px;
  color: black;

}
strong {
  font-weight: bold;
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