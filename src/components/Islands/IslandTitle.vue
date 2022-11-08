<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IslandTitle',
  props: {
    color: {
      type: String,
      required: false,
    },
    checked: {
      type: Boolean,
      required: false,
      default: false,
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <div class="dt-island__title" :class="[{ '-checked': checked, '-small': small }, `-${color}`]">
    <i-ic-outline-check-circle v-if="checked" />
    <div v-else>
      <i-ic-outline-mark-unread-chat-alt v-if="name === 'Caramban'" />
      <i-ic-outline-lightbulb v-if="name === 'IAïe'" />
      <i-ic-baseline-draw v-if="name === 'Logicias'" />
      <i-ic-baseline-network-check v-if="name === 'Nethosa'" />
      <i-ic-twotone-settings v-if="name === 'Robotix'" />
      <i-ic-baseline-security v-if="name === 'Segura'" />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.dt-island__title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  border-radius: 1.25rem;
  margin-bottom: 2rem;
  padding: .25rem 1rem;
  color: $orange;
  background: #fff;
  position: relative;
  font-weight: 700;
  border: none;
  outline: none;
  box-shadow: 0 2px 2px rgb(54 75 95 / 10%), 2px 0 2px rgb(54 75 95 / 5%);
  transition: .3s;

  &.-small {
    font-size: unset;
    gap: 5px;

    svg {
      width: 1.2em;
      height: 1.2em;
    }
  }

  &.-blue {
    color: $blue;
  }

  &.-green {
    color: $light-green;
  }

  &.-purple {
    color: $purple;
  }

  &.-purple-blue {
    color: $blue2;
  }

  &.-red {
    color: $dark-red;
  }

  &.-yellow {
    color: $dark-yellow;
  }
}
</style>
