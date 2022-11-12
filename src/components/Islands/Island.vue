<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, reactive } from 'vue'
import cybersecurite from '@/assets/data/cybersecurite.json'
import devLogiciel from '@/assets/data/dev_logiciel.json'
import IA from '@/assets/data/IA.json'
import maintenance from '@/assets/data/maintenance.json'
import reseaux from '@/assets/data/reseaux.json'
import robotique from '@/assets/data/robotique.json'
import { IslandStatus } from '@/Model/GameStatus'
import { IslandName } from '@/Model/Island/Island'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
import IslandTitle from '@/components/Islands/IslandTitle.vue'
import type { Island } from '@/Model/Island/Island'

export default defineComponent({
  name: 'Island',
  components: { IslandTitle },
  props: {
    island: {
      type: Object as PropType<Island>,
      required: true,
    },
  },
  setup(props) {
    const islandInfos = reactive<IslandInfo>({} as IslandInfo)

    function getIslandInfos(name: IslandName): IslandInfo {
      switch (name) {
        case IslandName.CARAMBAN:
          return maintenance
        case IslandName.IAIE:
          return IA
        case IslandName.LOGICIAS:
          return devLogiciel
        case IslandName.NETHOSA:
          return reseaux
        case IslandName.ROBOTIX:
          return robotique
        case IslandName.SEGURA:
          return cybersecurite
      }
    }
    onMounted(() => {
      Object.assign(islandInfos, getIslandInfos(props.island.name))
    })

    return {
      islandInfos,
    }
  },
})
</script>

<template>
  <!-- eslint-disable -->
  <g :class="'dt-' + island.name.toLowerCase()" v-if="island">
    <foreignObject class="dt-island__container" :x="island.coord.x" :y="island.coord.y" width="120px" height="100px">
      <div class="dt-island__content" :class="[{'-not-discovered': island.status === 0}]">
        <div class="dt-island__icon" style="padding: .5rem">
          <template v-if="island.status === 0"> ? </template>
          <img src="@/assets/img/icon/software.png" alt="robot.png" v-else>
        </div>
        <island-title :checked="island.status >= 2" v-if="island.status !== 0" :color="islandInfos.color" small :name="island.name">{{ island.name }}</island-title>
      </div>
    </foreignObject>
  </g>
</template>
