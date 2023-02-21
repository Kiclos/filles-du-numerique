<script lang="ts">
import { computed, defineComponent } from 'vue'

import useGameStore from '@/stores/game'
import type { Island } from '@/Model/Island/Island'

export default defineComponent({
  name: 'Islands',
  events: { selectIsland: (island: Island) => island },
  setup() {
    const gameStore = useGameStore()
    const islands: Island [] = gameStore.islands

    return {
      islands,
    }
  },
})
</script>

<template>
  <div class="dt-island">
    <svg viewBox="0 0 450 700" fill="none">
      <svg viewBox="0 0 900 1400" x="0" y="0" width="450" height="700">
        <foreignObject x="0" y="0" width="900" height="1400">
          <img src="@/assets/img/lines.png" alt="map">
        </foreignObject>
      </svg>
      <svg viewBox="0 0 900 1400" x="0" y="0" width="450" height="700">
        <foreignObject x="0" y="0" width="900" height="1400">
          <img src="@/assets/img/Robotix.png" alt="map">
        </foreignObject>
      </svg>
      <router-link v-for="island in islands" :key="island.id" :to="`/islands/${island.name}`"><Island :island="island" /></router-link>
    </svg>
  </div>
</template>

<style lang="scss">
@mixin setTitleColor($text, $bg, $iconText) {
  background: $bg;
  color: $text;

}

.dt-island {
  @supports (-webkit-touch-callout: none) {
    /* CSS specific to iOS devices */
    color: red!important;
  }
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }

  &__container {
    height: 100px;
    width: 140px;
    position: relative;
    justify-content: center;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top: 5px;

    &.-not-discovered {
      filter: grayscale(100%);

      .dt-island__icon {
        background: linear-gradient(135deg, lighten($grey, 5%), darken($grey, 10%));
      }
    }

    &.-complete {
      filter: sepia(100%);

      .dt-island__icon {
        background: linear-gradient(135deg, lighten($grey, 5%), darken($grey, 10%));
      }

      .dt-island__title {
        @include setTitleColor(darken($grey, 5%), $white, $white);
      }

      &:hover .dt-island__title {
        @include setTitleColor($white, darken($grey, 5%),  darken($grey, 5%));
      }
    }
  }

  &__icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 3rem;
    width: 3rem;
    margin-bottom: .5rem;
    padding: .25rem;
    border-radius: 1.5rem;
    background: $black;
    color: $white;
    font-size: 1.25rem;
    font-weight: bold;
    box-shadow: 0 4px 8px rgba($black, .5);
    transition: .3s;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

}

@mixin setIslandStyle($color1, $color2, $middleColor) {
  position: relative;
  cursor: pointer;

  .dt-island {
    &__icon {
      background: linear-gradient(135deg, $color1, $color2);
      box-shadow: 0 4px 8px rgba(darken($color1, 50%), .3);
    }
    &__title {
      @include setTitleColor($middleColor, $white, $white);
      cursor: pointer;
    }
  }

  &:hover {

    .dt-island__icon {
      transform: scale(1.1);
      box-shadow: 0 6px 8px rgba(darken($color1, 50%), .3);
    }

    .dt-island__title {
      @include setTitleColor($white, linear-gradient(135deg, $color1, $color2), $middleColor);
    }
  }

  &:active {
    .dt-island__icon {
      background: linear-gradient(135deg, darken($color1, 10%), darken($color2, 10%));
    }

    .dt-island__title {
      @include setTitleColor($white, linear-gradient(135deg, darken($color1, 10%), darken($color2, 10%)), darken($middleColor, 10%));
    }
  }
}

.dt-robotix {
  @include setIslandStyle(
      desaturate(lighten($red, 20%), 10%),
      desaturate(lighten($dark-pink, 10%), 10%),
      desaturate(lighten($dark-red, 20%), 10%),
  );
}

.dt-logicias {
  @include setIslandStyle(
      desaturate(lighten($yellow, 5%), 10%),
      desaturate(lighten($green, 10%), 10%),
      lighten($light-green, 5%),
  );
}

.dt-nethosa {
  @include setIslandStyle(
      desaturate(lighten($light-purple, 10%), 10%),
      desaturate(lighten($dark-purple, 20%), 10%),
      desaturate($light-purple, 10%),
  );
}

.dt-iaïe {
  @include setIslandStyle(
      desaturate($blue, 10%),
      desaturate(lighten($purple, 5%), 10%),
      desaturate($blue2, 5%),
  );
}

.dt-segura {
  @include setIslandStyle($blue, $very-light-green, $blue);
}

.dt-caramban {
  @include setIslandStyle(
      desaturate(lighten($yellow, 3%), 0%),
      desaturate(lighten($dark-yellow, 3%), 0%),
      lighten($dark-yellow, 3%),
  );
}
</style>
