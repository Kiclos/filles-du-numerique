<template>
  <!-- eslint-disable -->
  <div class="dt-island">
    <svg viewBox="0 0 450 700" fill="none">
      <svg viewBox="75 -40 900 1400">
        <foreignObject x="0" y="0" width="900" height="1400">
          <img src="@/assets/img/lines.png" alt="map">
        </foreignObject>
      </svg>
      <svg viewBox="75 -40 900 1400">
        <foreignObject x="0" y="0" width="900" height="1400">
          <img src="@/assets/img/Robotix.png" alt="map">
        </foreignObject>
      </svg>
      <Robotix/>
      <Logicas checked/>
      <Caramban/>
      <Segura/>
      <Nethosa/>
      <IAie/>
  </svg>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import Robotix from '@/components/Islands/Robotix.vue';
import Logicas from '@/components/Islands/Logicas.vue';
import Caramban from '@/components/Islands/Caramban.vue';
import Segura from '@/components/Islands/Segura.vue';
import Nethosa from '@/components/Islands/Nethosa.vue';
import IAie from '@/components/Islands/IAie.vue';

export default defineComponent({
  name: 'Islands',
  components: {
    IAie,
    Nethosa,
    Segura,
    Caramban,
    Logicas,
    Robotix,
  },
});
</script>
