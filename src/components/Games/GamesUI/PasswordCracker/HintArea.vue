<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'HintArea',
  props: {
    showArrow: {
      type: Boolean,
      required: true,
    },
  },
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
    <div class="arrow" :class="{ 'hidden-arrow': !showArrow }" />
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
