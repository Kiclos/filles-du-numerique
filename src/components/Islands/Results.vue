<template>
  <div class="dt-results" :class="`-${color}`">
    <header class="dt-results-header dt-flex-align-text--center">
      <nav>
        <button class="icon-close dt-grey" @click="$emit('close')"></button>
      </nav>
      <div class="dt-flex-center">
        <span class="icon-trophy dt-p16 dt-trophy--yellow dt-font-xxxl"></span>
        <h2 class="dt-inline-block">Félicitations !</h2>
      </div>
    </header>
    <article class="dt-p16 dt-results-article">
      <section class="dt-results-titlecontainer">
        <h4 class="dt-results-h4">{{jobData.islandName}}</h4>
        <h2 class="dt-results-h2">{{jobData.field}}</h2>
      </section>
      <TextContainer class="dt-p16 dt-textcontainer -neutral">
        <h4 class="dt-results-h4">{{jobData.field}}, kesako ?</h4>
        <p>{{jobData.results.summary}}</p>
      </TextContainer>

      <section class="dt-results-sliderscontainer dt-p16">
        <h4 class="dt-results-h4">Caractéristiques</h4>
        <div class="dt-results-oneslidercontainer" v-for="caracteristic in jobData.results.caracteristics" :key="caracteristic.labelLeft">
          <span class="dt-slider-label">
            <div :class="`icon-${caracteristic.iconLeft}`"></div>
            <p>{{caracteristic.labelLeft}}</p>
          </span>
          <input type="range" min="1" max="100" :value="caracteristic.value" class="slider" disabled>
          <span class="dt-slider-label">
            <div :class="`icon-${caracteristic.iconRight}`"></div>
            <p>{{caracteristic.labelRight}}</p>
          </span>
        </div>
      </section>

      <section>
        <h3 class="dt-results-h3">Focus sur un métier</h3>
        <h2 class="dt-results-h2">{{jobData.results.specificJob.jobName}}</h2>
        <TextContainer class="dt-textcontainer -outlined" :class="`-${color}`">
          <h4 class="dt-results-h4">Le travail au quotidien</h4>
          <p>{{jobData.results.specificJob.generalInfos}}</p>
          <TextContainer class="dt-textcontainer dt-results--statistics-container" :class="`-${color}`">
            <div class="dt-results--statistics-content">
              <strong>{{ Math.floor(jobData.results.specificJob.salary / 12) }}</strong>
              <br>
              € brut / mois
            </div>
            <div class="dt-results--statistics-content">
              <strong>{{jobData.results.specificJob.studies}}</strong>
            </div>
          </TextContainer>
          <template v-if="jobData.results.specificJob.impact">
            <h4 class="dt-results-h4">Quel impact ?</h4>
            <p>{{jobData.results.specificJob.impact}}</p>
          </template>
          <a v-if="jobData.results.specificJob.moreInfo" :href="jobData.results.specificJob.moreInfo">
            <Button class="dt-button -detail" :class="`-${color}`">En savoir plus</Button>
          </a>
          <a v-if="jobData.results.specificJob.moreJobs" :href="jobData.results.specificJob.moreJobs">
            <Button class="dt-button -outlined -detail" :class="`-${color}`">Voir d'autres métiers</Button>
          </a>
        </TextContainer>
      </section>

      <section v-if="jobData.results.specificJob.videos.length > 0" class="dt-flex-align-text--center">
        <div v-for="video in jobData.results.specificJob.videos" :key="video.title">
          <hr class="dt-results-separator">
          <h4 class="dt-results-h4">{{ video.title }}</h4>
          <iframe :src="video.url" title="YouTube video player"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
            gyroscope; picture-in-picture" allowfullscreen class="dt-results-video"></iframe>
        </div>
        <hr class="dt-results-separator">
      </section>

      <footer>
        <Button class="dt-button" :class="`-${color}`" @click="$emit('close')">Retour à la carte</Button>
      </footer>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from '../Button/Button.vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';
import IslandData from '@/Model/Island/IslandData';

export default defineComponent({
  name: 'game-results',
  components: {
    TextContainer,
    Button,
  },
  props: {
    jobData: {
      type: Object as PropType<IslandData>,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
});
</script>
