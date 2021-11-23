<template>
  <div class="dt-p16">
    <h2>Félicitations !</h2>
    <p>Score: 1980</p>
    <TextContainer class="dt-textcontainer--neutral">
      <h3>Qu'est-ce que le métier de ...</h3>
      <p>OMG un text container... Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Soluta, explicabo. Beatae labore ducimus corporis autem atque itaque dolor in quidem
        veniam, voluptatum libero unde saepe delectus fugiat enim consectetur expedita!</p>
    </TextContainer>
    <TextContainer class="dt-textcontainer--blue"
      style="display: flex; justify-content: space-between">
      <div style="border-right: solid white 1px">
        3500
        <br>
        €/mois
      </div>
      <div>
        BAC+5
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
    <Button class="dt-button--blue">Retour à la carte</Button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '../components/Button/Button.vue';
import TextContainer from '@/components/TextContainer/TextContainer.vue';

export default defineComponent({
  name: 'game-results',
  props: {
    resume: String,
  },
  setup(props, context) {
    console.log(props.resume);
  },
  components: {
    TextContainer,
    Button,
  },
});
</script>
