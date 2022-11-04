<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepButton',
  props: {
    color: {
      type: String,
      required: false,
    },
    back: {
      type: Boolean,
      required: false,
      default: false,
    },
    next: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<template>
  <button :class="[{ 'dt-next-button': next }, `dt-step-button dt-step-button-${color}`]">
    <span v-if="back" class="icon-arrow_back" />
    <slot />
    <span v-if="next" class="icon-skip_next" />
  </button>
</template>

<style lang="scss">
.dt-step-button {
  color: $white;
  background: none;
  border: 1px solid $white;
  border-radius: 3px;
  cursor: pointer;
  transition: .3s;

  &:hover {
    background-color: $white;
  }

  &:active {
    background-color: darken($white, 10%);
    border-color: darken($white, 10%);
    color: $orange;
  }
}
.dt-step-button-blue {
  &:hover, &:active {
    color: $dark-blue;
  }
}
.dt-step-button-green {
  &:hover, &:active {
    color: $light-green;
  }
}
.dt-step-button-purple {
  &:hover, &:active {
    color: $purple;
  }
}
.dt-step-button-purple-blue {
  &:hover, &:active {
    color: $blue2;
  }
}
.dt-step-button-red {
  &:hover, &:active {
    color: $dark-red;
  }
}
.dt-step-button-yellow {
  &:hover, &:active {
    color: $dark-yellow;
  }
}

.icon-arrow_back {
  font-size: 2rem;
}

.icon-skip_next {
  margin-left: .25rem;
  font-size: 1.5rem;
}

.dt-next-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: right;
  font-size: .8rem;
  font-weight: 600;
  padding-left: .5rem;

}
</style>
