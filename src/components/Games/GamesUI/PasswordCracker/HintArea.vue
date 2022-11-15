<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'HintArea',
  setup(_, { emit }) {
    onMounted(() => {
      setTimeout(() => {
        document.querySelectorAll('.hint-button').forEach((element) => {
          element.classList.add('hint-hidden')
        })
      }, 2000)
    })
  },
})
</script>

<template>
  <div class="hint-area">
      <button class="dt-button -yellow hint-button">
        <span class="hint-icon"><i-mdi-lightbulb-on-outline /></span><span class="hint-label"> Indice</span>
      </button>
  </div>
</template>

<style lang="scss">
.hint-area {
  position: absolute;
  width: 100%;
  padding: 0 10px;
  right: 2rem;
}
.hint-button {
  display: flex;
  width: 129px;
  float: right;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  padding: 3px 14px;
}
.hint-icon {
  font-size: 26px;
}
.hint-label {
  opacity: 1;
}
.hint-hidden {
    transition: width 1s;
    width: 59px;
   .hint-label {
    transition: all 1s;
    opacity: 0;
  }
  &:hover {
    width: 129px;
    .hint-label {
      opacity: 1;
    }
  }
}
</style>
