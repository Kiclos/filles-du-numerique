<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WinScreen',
  props: {
    color: {
      type: String,
      required: false,
      default: '',
    },
    reward: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['close'],
  events: { close: () => null },
  setup(_, { emit }) {
    function handleClick(): void {
      emit('close')
    }
    return { handleClick }
  },
})
</script>

<template>
  <div class="dt-win-screen__container" :class="`-${color}`" @click="handleClick()">
    <template v-if="reward.length > 0">
      <h1 class="dt-win-screen__title">
        Félicitations !
      </h1>
      <div class="dt-win-screen__icon__container">
        <div class="dt-win-screen__icon__content" :class="`-${reward}`" />
      </div>
      <h2 class="dt-win-screen__subtitle">
        Vous avez obtenu <br>une nouvelle pièce de Rebecca !
      </h2>
    </template>
    <template v-else>
      <h1 class="dt-win-screen__title">
        Victoire !
      </h1>
    </template>
  </div>
</template>

<style lang="scss">
@keyframes win-screen-zoom {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

@mixin setWinScreenColor($color1, $color2) {
  background: linear-gradient(95.43deg, $color1 -6.84%, $color2 124.14%);
}

.dt-win-screen {

  &__container {
    @include setWinScreenColor($yellow, $pink);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    z-index: 2;

    &:before, &:after {
      position: absolute;
      content: "";
      top: -20%;
      left: -10;
      width: 120%;
      height: 120%;
      opacity: .6;
      z-index: -1;
    }

    &:before {
      background: url("../../assets/img/WinScreen/Vector 1.svg") center center no-repeat;
      background-size: cover;
    }

    &:after {
      background: url("../../assets/img/WinScreen/Vector 2.svg") center center no-repeat;
      background-size: cover;
    }

    &.-blue {
      @include setWinScreenColor($blue, $very-light-green);
    }

    &.-green {
      @include setWinScreenColor($green, $yellow);
    }

    &.-purple {
      @include setWinScreenColor($light-purple, $dark-purple);
    }

    &.-purple-blue {
      @include setWinScreenColor($blue, $purple);
    }
    &.-red {
      @include setWinScreenColor(desaturate($red, 25%), desaturate($dark-pink, 10%));
    }

    &.-yellow {
      @include setWinScreenColor($yellow, $dark-yellow);
    }
  }

  &__title, &__subtitle {
    color: $white;
    text-align: center;
    transform: scale(0);
    animation: .3s ease-in-out win-screen-zoom forwards;
    animation-delay: .3s;
    text-shadow: 0 4px 10px rgba($black, .25),
    0 2px 2px rgba($black, .1), 0 -2px 2px rgba($black, .1),
    2px 0 2px rgba($black, .1), -2px 0 2px rgba($black, .1);
    z-index: 1;
  }

  &__title {
    letter-spacing: 2px;
    animation-delay: .3s;
    text-transform: uppercase;
    font-size: 2.5rem;
  }

  &__subtitle {
    letter-spacing: 1px;
    font-size: 1.75rem;
    animation-delay: .9s;
  }

  &__icon {
    &__container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 15rem;
      width: 15rem;
      margin: 4rem 0;
      border-radius: 7.5rem;
      background: $white;
      box-shadow: 6px 0 6px rgba($black, 0.075), 0 6px 6px rgba($black, 0.1);
      transform: scale(0);
      animation: .3s ease-in-out win-screen-zoom forwards;
      animation-delay: .6s;
      z-index: 1;
    }

    &__content {
      height: 100%;
      width: 100%;

      &.-body {
        background: url('../../assets/img/Rebecca/corps.png') center center no-repeat;
        background-size: 60%;
      }

      &.-antenne {
        background: url('../../assets/img/Rebecca/Antenne.png') center center no-repeat;
      }

      &.-arm-left {
        background: url('../../assets/img/Rebecca/bras_g.png') center center no-repeat;
        background-size: 28%;
        transform: rotateZ(20deg);
      }

      &.-arm-right {
        background: url('../../assets/img/Rebecca/bras_d.png') center center no-repeat;
        background-size: 28%;
        transform: rotateZ(-20deg);
      }

      &.-leg-left {
        background: url('../../assets/img/Rebecca/jambe_g.png') center center no-repeat;
        transform: rotateZ(20deg);
      }

      &.-leg-right {
        background: url('../../assets/img/Rebecca/jambe_d.png') center center no-repeat;
        transform: rotateZ(-20deg);
      }
    }
  }
}
</style>
