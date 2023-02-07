<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import TextContainer from '@/components/TextContainer/TextContainer.vue'
import type { IslandInfo } from '@/Model/Island/IslandInfo'

export default defineComponent({
  name: 'GameResults',
  components: {
    TextContainer,
  },
  props: {
    jobData: {
      type: Object as PropType<IslandInfo>,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <div class="dt-results" :class="`-${color}`">
    <header class="dt-results-header dt-flex-align-text--center">
      <nav>
        <DTButton class="icon-close dt-grey" @click="$emit('close')" />
      </nav>
      <div class="dt-flex-center">
        <span class="icon-trophy dt-p16 dt-trophy--yellow dt-font-xxxl" />
        <h2 class="dt-inline-block">
          Félicitations !
        </h2>
      </div>
    </header>
    <article class="dt-p16 dt-results-article">
      <section class="dt-results-titlecontainer">
        <h4 class="dt-results-h4">
          {{ jobData.islandName }}
        </h4>
        <h2 class="dt-results-h2">
          {{ jobData.field }}
        </h2>
      </section>
      <TextContainer class="dt-p16 dt-textcontainer -neutral">
        <h4 class="dt-results-h4">
          {{ jobData.field }}, kesako ?
        </h4>
        <p>{{ jobData.results.summary }}</p>
      </TextContainer>

      <section class="dt-results-sliderscontainer dt-p16">
        <h4 class="dt-results-h4">
          Caractéristiques
        </h4>
        <div v-for="caracteristic in jobData.results.caracteristics" :key="caracteristic.labelLeft" class="dt-results-oneslidercontainer">
          <span class="dt-slider-label">
            <div :class="`icon-${caracteristic.iconLeft}`" />
            <p>{{ caracteristic.labelLeft }}</p>
          </span>
          <input type="range" min="1" max="100" :value="caracteristic.value" class="slider" disabled>
          <span class="dt-slider-label">
            <div :class="`icon-${caracteristic.iconRight}`" />
            <p>{{ caracteristic.labelRight }}</p>
          </span>
        </div>
      </section>

      <section>
        <h3 class="dt-results-h3">
          Focus sur un métier
        </h3>
        <h2 class="dt-results-h2">
          {{ jobData.results.specificJob.jobName }}
        </h2>
        <TextContainer class="dt-textcontainer -outlined" :class="`-${color}`">
          <h4 class="dt-results-h4">
            Le travail au quotidien
          </h4>
          <p>{{ jobData.results.specificJob.generalInfos }}</p>
          <TextContainer class="dt-textcontainer dt-results--statistics-container" :class="`-${color}`">
            <div class="dt-results--statistics-content">
              <strong>{{ Math.floor(jobData.results.specificJob.salary / 12) }}</strong>
              <br>
              € brut / mois
            </div>
            <div class="dt-results--statistics-content">
              <strong>{{ jobData.results.specificJob.studies }}</strong>
            </div>
          </TextContainer>
          <template v-if="jobData.results.specificJob.impact">
            <h4 class="dt-results-h4">
              Quel impact ?
            </h4>
            <p>{{ jobData.results.specificJob.impact }}</p>
          </template>
          <a v-if="jobData.results.specificJob.moreInfo" :href="jobData.results.specificJob.moreInfo">
            <DTButton detail :color="color">En savoir plus</DTButton>
          </a>
          <a v-if="jobData.results.specificJob.moreJobs" :href="jobData.results.specificJob.moreJobs">
            <DTButton outlined detail :color="color">Voir d'autres métiers</DTButton>
          </a>
        </TextContainer>
      </section>

      <section v-if="jobData.results.specificJob.videos.length > 0" class="dt-flex-align-text--center">
        <div v-for="video in jobData.results.specificJob.videos" :key="video.title">
          <hr class="dt-results-separator">
          <h4 class="dt-results-h4">
            {{ video.title }}
          </h4>
          <iframe
            :src="video.url" title="YouTube video player"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
            gyroscope; picture-in-picture" allowfullscreen class="dt-results-video"
          />
        </div>
        <hr class="dt-results-separator">
      </section>

      <footer>
        <router-link to="/islands">
          <DTButton :color="color" @click="$emit('close')">
            Retour à la carte
          </DTButton>
        </router-link>
      </footer>
    </article>
  </div>
</template>

<style lang="scss">
@mixin setResultColor($color) {
  .dt-slider-label {
    color: desaturate(darken($color, 15%), 15%);
  }

  .dt-results-h2 {
    color: desaturate(darken($color, 15%), 15%);
  }

  .slider::-webkit-slider-thumb {
    background: desaturate(darken($color, 15%), 15%);;
  }
}

.dt-results {
  @include setResultColor($orange);
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background: $white;
  z-index: 2;

  .dt-textcontainer {
    width: 100%;
  }

  section {
    margin: 3rem auto;
  }

  &-header {
    background: rgba($light-grey, 30%);
    padding-bottom: 1rem;

    nav {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      padding: 0 calc((100vw - 500px) / 2);

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border: none;
        background: none;
        cursor: pointer;
        height: 2rem;
        width: 2rem;
        border-radius: 1rem;
        font-size: 1.25rem;
        transition: .3s;

        &:hover {
          background-color: rgba($black, .1);
        }

        &:active {
          background-color: rgba($black, .2);
        }
      }
    }
  }

  &-article {
    margin: auto;
    max-width: 500px;
  }

  &--statistics {
    &-container {
      margin: 1rem auto;
      width: 100%;
      padding: 0;
      display: flex;
      align-items: center;
    }
    &-content {
      width: 100%;
      border-right: 1px solid white;
      padding: 0.5rem 1rem;
      text-align: center;
      font-weight: 700;
      font-family: 'open sans', sans-serif;
      font-size: 16px;
      strong {
        font-size: 28px;
      }
    }
  }

  &-separator {
    border: none;
    height: 1px;
    margin: 16px auto;
    width: 55%;
    background-color: $light-grey;
  }

  &-titlecontainer {
    width: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;

    .dt-results-h4 {
      margin: 0;
    }
  }

  &-h3 {
    font-family: 'arial';
    color: $grey;
    font-weight: 800;
  }

  &-h4 {
    font-family: 'arial';
    font-weight: 800;
    margin-bottom: 16px;
  }

  &-sliderscontainer {
    width: 100%;
    margin: 3rem 0;

    .dt-results-oneslidercontainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
      width: 100%;
    }

    .dt-slider-label {
      white-space: nowrap;
      font-size: small;
      text-align: center;
      width: 10rem;
      &:first-child {
        margin-right: 1rem;
      }

      &:last-child {
        margin-left: 1rem;
      }
    }

    .slider {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }

    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 4px;
      height: 8px;
    }

  }

  &-video {
    border-radius: 1rem;
  }

  &.-blue {
    @include setResultColor($blue);
  }

  &.-green {
    @include setResultColor(saturate($light-green, 25%));
  }

  &.-purple {
    @include setResultColor($light-purple);
  }

  &.-purple-blue {
    @include setResultColor(lighten($blue2, 10%));
  }

  &.-red {
    @include setResultColor($red);
  }

  &.-yellow {
    @include setResultColor($yellow);
  }

}

.dt-trophy {
  &--yellow{
    color: $yellow;
  }
}
</style>
