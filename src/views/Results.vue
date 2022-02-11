<template>
  <div class="dt-results">
    <header class="dt-results-header dt-p16 dt-flex-align-text--center">
      <nav class="dt-w100 dt-h16">
        <div class="icon-close dt-floatR dt-grey" @click="$emit('close')"></div>
      </nav>
      <div class="dt-flex-text--center">
        <span class="icon-trophy dt-p16 dt-trophy--yellow dt-font-xxxl"></span>
        <h2 class="dt-inline-block">Félicitations !</h2>
      </div>
    </header>
    <section class="dt-p16">
      <div class="dt-results-titlecontainer">
        <h4 class="island-name">{{jobData.islandName}}</h4>
        <h2 class="dt-results-h2">{{jobData.field}}</h2>
      </div>
    <TextContainer class="dt-p16 dt-textcontainer--neutral">
      <h3>{{jobData.field}}, kesako ?</h3>
      <p>{{jobData.results.summary}}</p>
    </TextContainer>
    <br>
    <div class="dt-results-sliderscontainer dt-p16">
      <h4>Caractéristiques</h4>
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
    </div>

    <h3>Focus sur un métier</h3>
    <h2 class="dt-results-h2">{{jobData.results.specificJob.jobName}}</h2>
    <TextContainer class="dt-textcontainer--outlined--blue">
      <h3>Le travail au quotidien</h3>
      <p>{{jobData.results.specificJob.generalInfos}}</p>
      <TextContainer class="dt-textcontainer--blue dt-results--statistics-container">
        <div class="dt-results--statistics-content">
          <strong>{{jobData.results.specificJob.salary / 12}}</strong>
          <br>
          € brut / mois
        </div>
        <div class="dt-results--statistics-content" >
          <strong>{{jobData.results.specificJob.studies}}</strong>
        </div>
      </TextContainer>
      <h3>Quel impact ?</h3>
      <p>Etre toi a de nombreux impacts positifs sur blabla... Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
        illum, quaerat iure eius animi ratione alias omnis consequatur cum voluptas error eveniet,
        ipsum possimus dignissimos facilis asperiores amet vel quae.</p>
      <Button class="dt-button -blue" @click="$emit('close')">En savoir plus</Button>
      <Button class="dt-button -blue -outlined" @click="$emit('close')">Voir d'autres métiers</Button>
    </TextContainer>
    <hr class="dt-results-separator">
      <div>
        <h3>Le témoignage d'une pro :</h3>
        <iframe src="https://www.youtube.com/embed/O8ouH41S2fs" title="YouTube video player"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

    <hr class="dt-results-separator">
    <Button class="dt-button -blue" @click="$emit('close')">Retour à la carte</Button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from '../components/Button/Button.vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';
import IslandData from '@/Model/IslandData';

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
  },
});
</script>
