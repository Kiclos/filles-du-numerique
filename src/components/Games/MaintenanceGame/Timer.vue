<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Timer',
  props: {
    countdown: {
      type: Number,
      required: true,
    },
  },
  emits: ['countdownEnd'],
  setup(props, { emit }) {
    const countdownTimer = ref(props.countdown)
    const handleCountdown = (): number => {
      // eslint-disable-next-line no-console
      console.log(countdownTimer.value)
      if (countdownTimer.value === 0) {
        emit('countdownEnd')
      }
      else {
        countdownTimer.value -= 1
        setTimeout(() => {
          handleCountdown()
        }, 2000)
      }
      return countdownTimer.value
    }
    handleCountdown()
    return {
      countdownTimer,
    }
  },
})
</script>

<template>
  <div className="timerCircle">
    {{ countdownTimer }}
  </div>
</template>

<style lang="scss" scoped>
.timerCircle {
  margin: 10px;
  width: 126px;
  height: 126px;
  border-radius: 63px;

  background: #FFFFFF;
  border: 5px solid #FF0000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  color: #000000;
}
</style>
