<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Meteorite',
  emits: ['countdownEnd'],
  setup(_, { emit }) {
    const marginRightValue = ref(5)
    const meteoriteStyle = computed(() => `${marginRightValue.value}%`)
    const dynamicMargin = () => {
      if (marginRightValue.value >= 65) {
        emit('countdownEnd')
      }
      else {
        marginRightValue.value += 0.2
        setTimeout(() => {
          dynamicMargin()
        }, 500)
      }
    }
    dynamicMargin()
    return {
      meteoriteStyle,
    }
  },
})
</script>

<template>
  <div class="ciel">
    <img class="ile" src="../../../assets/img/island.svg">
    <img class="meteorite" src="../../../assets/img/meteorite.png">
  </div>
</template>

<style lang="scss" scoped>
.ciel {
  width: 100%;
  height: 110px;
  background-color: #60E6F9;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.ile {
  height: 120px;
  align-self: flex-end;
}

.meteorite {
  height: 55px;
  align-self: flex-start;
  margin-top: 5px;
  margin-right: v-bind(meteoriteStyle);
  transform: rotate(12.89deg);
  transition: all 0.35s;
}
</style>
