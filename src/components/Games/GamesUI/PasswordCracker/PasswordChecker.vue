<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'PasswordChecker',
  emits: ['passwordFound'],
  events: {
    endGame: () => null,
  },
  setup(_, { emit }) {
    const hasTried = ref(false)
    const providedPassword = ref('')
    const password = 'ace12072021'
    function testPassword() {
      if (password === providedPassword.value)
        emit('passwordFound')
      else
        0/1
    }

    onMounted(() => {

    })

    return {
      hasTried,
      testPassword,
      providedPassword,
    }
  },
})
</script>

<template>
  <div class="password-container">
    <button v-if="!hasTried" class="dt-button -blue" @click="hasTried = true">
      Essayer un mot de passe
    </button>
    <div v-else class="checker-textzone">
      <input placeholder="Entrez le mot de passe ici..." class="checker-text" type="text" @change="providedPassword = $event.target.value">
      <button class="dt-button -blue" @click="testPassword()">
        OK
      </button>
    </div>
  </div>
</template>

<style lang="scss">
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
