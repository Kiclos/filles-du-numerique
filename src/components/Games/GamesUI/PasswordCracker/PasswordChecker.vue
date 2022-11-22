<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'PasswordChecker',
  props: {
    hintsRemaining: {
      type: Number,
      required: true,
    },
    showErrorMessage: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['passwordFound', 'passwordNotFound'],
  events: {
    endGame: () => null,
  },
  setup(_, { emit }) {
    const hasTried = ref(false)
    const providedPassword = ref('')
    const password = 'ace12072021'
    function testPassword() {
      if (password === providedPassword.value.toLowerCase())
        emit('passwordFound')

      else
        emit('passwordNotFound')
    }
    function checkKey(e: { which: number }) {
      if (e.which === 13) {
        const btn = document.getElementById('test-password-btn')
        if (btn !== null)
          btn.click()
      }
    }
    onMounted(() => {

    })

    return {
      hasTried,
      testPassword,
      providedPassword,
      checkKey,
    }
  },
  computed: {
    getSentence() {
      if (this.hintsRemaining > 1)
        return `Le mot de passe est incorrect. Tu devrais peut-être demander un indice pour te guider. Tu en as encore ${this.hintsRemaining - 1} à ta disposition.`
      else
        return 'Malheureusement, ce n\'est pas la bonne réponse. Si tu souhaites avoir la réponse, tu peux cliquer sur le bouton en haut à droite.'
    },
  },
})
</script>

<template>
  <div class="password-container">
    <div class="error-container" :class="{ 'error-hidden': !showErrorMessage }">
      <span>{{ getSentence }}</span>
    </div>
    <button v-if="!hasTried" class="dt-button -blue" @click="hasTried = true">
      Essayer un mot de passe
    </button>
    <div v-else class="checker-textzone">
      <input placeholder="Entrez le mot de passe ici..." class="checker-text" type="text" @keyup="checkKey($event)" @change="providedPassword = $event.target.value">
      <button id="test-password-btn" class="dt-button -blue" @click="testPassword()">
        OK
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.error-container {
  position: absolute;
  transition: opacity 1s, top 1s;
  opacity: 1;
  background: #fff;
  height: 70px;
  width: 100%;
  border-radius: 15px;
  top: -70px;
  padding: 8px;
  text-align: center;
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.1), inset 30px 30px 60px rgba(255, 255, 255, 0.25), inset 10px 10px 20px rgba(255, 255, 255, 0.25);
}
.error-hidden {
  opacity: 0;
  top: 30px;
}
.password-container {
  position: relative;
}
.checker-textzone {
  display: grid;
  grid-template-columns: auto 120px;
  gap: 10px;
}
.checker-text {
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.1), inset 30px 30px 60px rgba(255, 255, 255, 0.25), inset 10px 10px 20px rgba(255, 255, 255, 0.25);
  position: relative;
  outline: none;
  transition: 0.3s;
  margin: 0.5rem 0;
  padding: 14px 24px;
  border-radius: 15px;
  border: none;
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
}
</style>
