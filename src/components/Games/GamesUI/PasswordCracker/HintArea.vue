<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'HintArea',
  props: {
    showArrow: {
      type: Boolean,
      required: true,
    },
    hint: {
      type: String,
      required: true,
    },
  },
  emits: ['hintClicked'],
  setup(props, { emit }) {
    const hintShowed = ref(false)
    function handleBtnClick() {
      if (!hintShowed.value)
        emit('hintClicked')
      hintShowed.value = true
    }
    onMounted(() => {
      setTimeout(() => {
        document.querySelectorAll('.hint-button').forEach((element) => {
          element.classList.add('hint-hidden')
        })
      }, 2000)
    })
    return { handleBtnClick, hintShowed }
  },
})
</script>

<template>
  <div class="hint-area">
    <button class="dt-button -yellow hint-button" @click="handleBtnClick()">
      <span class="hint-icon"><i-mdi-lightbulb-on-outline /></span><span class="hint-label"> Indice</span>
    </button>
    <div class="arrow" :class="{ 'hidden-arrow': !showArrow }" />
    <div style="height: 65px; margin-right: 10000px" />
    <div class="hint-container" :class="{ 'hint-container-hidden': !hintShowed }">
      <span>{{ hint }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.hint-container {
  color: black;
  transition: opacity 1s, margin-top 1s;
  opacity: 1;
  background: #fff;
  height: 70px;
  width: 300px;
  float:right;
  border-radius: 15px;
  padding: 8px;
  text-align: center;
  margin-top: 0;
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.1), inset 30px 30px 60px rgba(255, 255, 255, 0.25), inset 10px 10px 20px rgba(255, 255, 255, 0.25);
}
.hint-container-hidden {
  opacity: 0;
  margin-top: -150px;
}
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
.arrow {
  width:70px;
  height:30px;
  opacity: 1;
  transition: opacity 1s;
  display: inline-flex;
  float: right;
  margin-top: 13px;
  margin-right: 5px;
}
.arrow:before {
  content: "";
  flex: 1;
  margin: 0 5px;
  background: #dc3838;
  clip-path: polygon(0 10px,calc(100% - 15px) 10px,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,calc(100% - 15px) calc(100% - 10px),0 calc(100% - 10px));
  animation: a3 .5s infinite alternate;
}

.arrow:after {
  --s:-1;
}
.hidden-arrow {
  opacity: 0;
}
@keyframes a3 {
  0%  {transform: scaleX(var(--s,1)) translate(-4px)}
  100%{transform: scaleX(var(--s,1)) translate( 4px)}
}
</style>
