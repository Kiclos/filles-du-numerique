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
  },
})
</script>

<template>
  <div class="dt-island__title" :class="[{ '-checked': checked, '-small': small }, `-${color}`]">
    <slot />
  </div>
</template>

<style lang="scss">
.dt-island__title {
  font-size: 1.5rem;
  border-radius: 1.25rem;
  margin-bottom: 2rem;
  padding: .25rem 1rem;
  padding-left: 2.5rem;
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
  }

  [class$="-icon"] {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: .75rem;
    font-size: 1rem;
    background-color: $orange;
    font-family: 'icon' !important;
    position: absolute;
    left: 0.4rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.4rem;
    font-weight: 700;
    color: #fff;
    transition: .3s;
  }

  &.-blue {
    color: $blue;

    [class$="-icon"] {
      background-color: $blue;
    }
  }

  &.-green {
    color: $light-green;

    [class$="-icon"] {
      background-color: $light-green;
    }
  }

  &.-purple {
    color: $purple;

    [class$="-icon"] {
      background-color: $purple;
    }
  }

  &.-purple-blue {
    color: $blue2;

    [class$="-icon"] {
      background-color: $blue2;
    }
  }

  &.-red {
    color: $dark-red;

    [class$="-icon"] {
      background-color: $dark-red;
    }
  }

  &.-yellow {
    color: $dark-yellow;

    [class$="-icon"] {
      background-color: $dark-yellow;
    }
  }
}
</style>
