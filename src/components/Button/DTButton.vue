<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DTButton',
  props: {
    text: {
      type: Boolean,
      required: false,
      default: false,
    },
    outlined: {
      type: Boolean,
      required: false,
      default: false,
    },
    color: {
      type: String,
      required: false,
      default: '',
    },
    detail: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <button class="dt-button" :class="[{ '-text': text, '-outlined': outlined, '-detail': detail }, color === '' ? '' : `-${color}`]">
    <slot />
  </button>
</template>

<style lang="scss">
@mixin setDefaultButtonColor($color1, $color2, $text-color) {
  background: linear-gradient(95.43deg, $color1 -6.84%, $color2 124.14%);
  color: $text-color;
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.05),
  0 4px 4px rgba(0, 0, 0, 0.1),
  inset 30px 30px 60px rgba(255, 255, 255, 0.25),
  inset 10px 10px 20px rgba(255, 255, 255, 0.25);
}

.dt-button {
  @include setDefaultButtonColor($yellow, $pink, $white);

  overflow: hidden;
  position:  relative;
  cursor: pointer;
  outline: none;
  transition: .3s;
  width: 100%;
  margin: 0.5rem 0;

  padding: 14px 24px;
  border-radius: 15px;
  border: none;

  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  text-align: center;

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    transition: .3s;
  }

  &:hover:after {
    background-color: rgba($white, .2);
  }

  &:active:after {
    background-color: rgba($black, .2);
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: none !important;
    filter: grayscale(1);
    opacity: .5;
  }

  @mixin setTextButtonColor($color1, $color2, $text-color) {
    background: linear-gradient(95.43deg, rgba($color1, 0.1) -6.84%, rgba($color2, 0.1) 124.14%);
    color: $text-color;
    box-shadow: none;
  }

  &.-text {
    @include setTextButtonColor($yellow, $pink, $orange);
  }

  &.-reversed {
    color: $orange;
    background: $white;
  }

  @mixin setOutlineButtonColor($color) {
    color: $color;
    background: none;
    border: solid $color 2px;
    box-shadow: none;
  }

  &.-outlined {
    @include setOutlineButtonColor($orange);
  }

  &.-reversed-outlined {
    color: $white;
    background: none;
    border: solid $white 2px;
  }

  &.-reversed-text {
    color: $white;
    background: rgba($black, 0.15);
  }

  &.-detail {
    padding: 0.5rem 0;
  }

  &.-blue {
    @include setDefaultButtonColor($dark-blue, $very-light-green, $white);

    &.-outlined {
      @include setOutlineButtonColor($dark-blue);
    }

    &.-text {
      @include setTextButtonColor($dark-blue, $very-light-green, $dark-blue)
    }
  }

  &.-green {
    @include setDefaultButtonColor($green, $yellow, $white);

    &.-outlined {
      @include setOutlineButtonColor($light-green);
    }

    &.-text {
      @include setTextButtonColor($green, $yellow, $light-green)
    }
  }

  &.-purple {
    @include setDefaultButtonColor($light-purple, $dark-purple, $white);

    &.-outlined {
      @include setOutlineButtonColor($purple);
    }

    &.-text {
      @include setTextButtonColor($light-purple, $dark-purple, $purple)
    }
  }

  &.-purple-blue {
    @include setDefaultButtonColor($blue, $purple, $white);

    &.-outlined {
      @include setOutlineButtonColor($blue2);
    }

    &.-text {
      @include setTextButtonColor($blue, $purple, $blue2)
    }
  }

  &.-red {
    @include setDefaultButtonColor($red, $dark-pink, $white);

    &.-outlined {
      @include setOutlineButtonColor($red);
    }

    &.-text {
      @include setTextButtonColor($red, $dark-pink, $dark-red)
    }
  }

  &.-yellow {
    @include setDefaultButtonColor(darken($yellow, 10%), darken($dark-yellow, 10%), $white);

    &.-outlined {
      @include setOutlineButtonColor($dark-yellow);
    }

    &.-text {
      @include setTextButtonColor($yellow, $dark-yellow, $dark-yellow)
    }
  }

}
</style>
