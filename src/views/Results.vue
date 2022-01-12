<template>
  <div class="dt-results dt-p16">
    <header class="dt-p16-center">
      <div class="dt-p16" style="background-color: red;"></div>
      <h2>Félicitations !</h2>
      <p>Score: 1980</p>
    </header>
    <TextContainer class="dt-textcontainer--neutral">
      <h3>Qu'est-ce que le métier de dev ?</h3>
      <p>Dev, c'est avant tout un état d'esprit... Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Soluta, explicabo. Beatae labore ducimus corporis autem atque itaque dolor in quidooem
        veniam, voluptatum libero unde saepe delectus fugiat enim consectetur expedita!</p>
    </TextContainer>
    <TextContainer class="dt-textcontainer--neutral dt-w100">
      <h3>Le témoignage de Samantha :</h3>
      <iframe src="https://www.youtube.com/embed/O8ouH41S2fs" title="YouTube video player"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
        gyroscope; picture-in-picture" allowfullscreen></iframe>    </TextContainer>
    <TextContainer class="dt-textcontainer--blue dt-results--statistics-container">
      <div class="dt-results--statistics-content">
        <strong>3500</strong>
        <br>
        €/mois
      </div>
      <div class="dt-results--statistics-content" >
        <strong>BAC+5</strong>
      </div>
    </TextContainer>
    <TextContainer class="dt-textcontainer--neutral">
      <h3>Le travail au quotidien</h3>
      <p>Ici c'est du blabla... Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
        suscipit libero itaque, quae, vero non rem, illo nam quidem iusto voluptatem repellat
        sequi id minima quis alias incidunt dicta ut.</p>
      <h3>Quel impact ?</h3>
      <p>Ici c'est du blabla... Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
        illum, quaerat iure eius animi ratione alias omnis consequatur cum voluptas error eveniet,
        ipsum possimus dignissimos facilis asperiores amet vel quae.</p>
    </TextContainer>
    <Button class="dt-button--reversed-blue">Voir plus d'informations</Button>
    <Button class="dt-button--blue" @click="$emit('close')">Retour à la carte</Button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';

export default defineComponent({
  name: 'game-results',
  components: {
    TextContainer,
    Button,
  },
});
</script>
