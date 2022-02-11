<template>
  <div class="dt-results">
    <header class="dt-results-header dt-p16-center">
      <span class="icon-trophy dt-trophy--yellow">
      </span>
      <span>
        <h2>Félicitations !</h2>
      </span>
    </header>
    <section class="dt-p16">
        <h4>{{jobData.islandName}}</h4>
        <h2>{{jobData.field}}</h2>
    <TextContainer class="dt-textcontainer--neutral">
      <h3>{{jobData.field}}, kesako ?</h3>
      <p>{{jobData.results.summary}}</p>
    </TextContainer>
    <br>
    <h4>Caractéristiques</h4>
    <p>Solitaire ou en équipe ?</p>
    <input type="range" min="1" max="100" :value="jobData.results.teamWork" class="slider" disabled>
    <p>Casanier ou routard ?</p>
    <input type="range" min="1" max="100" :value="jobData.results.shifts" class="slider" disabled>
    <p>Matériel ou virtuel ?</p>
    <input type="range" min="1" max="100" :value="jobData.results.virtual" class="slider" disabled>
    <p>des sliders</p>
    <br>
    <h3>Focus sur un métier</h3>
    <h2>{{jobData.results.specificJob.jobName}}</h2>
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
    </TextContainer>
    <hr>
    <TextContainer class="dt-textcontainer--neutral dt-w100">
      <h3>Le témoignage d'une pro :</h3>
      <iframe src="https://www.youtube.com/embed/O8ouH41S2fs" title="YouTube video player"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture" allowfullscreen></iframe>
    </TextContainer>
    <hr>
    <Button class="dt-button--reversed-blue">Voir plus d'informations</Button>
    <Button class="dt-button--blue" @click="$emit('close')">Retour à la carte</Button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from '../Button/Button.vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';

export default defineComponent({
  name: 'game-results',
  components: {
    TextContainer,
    Button,
  },
  props: {
    jobData: {
      type: Object as PropType<any>,
      required: true,
    },
  },
});
</script>
