<script lang="ts" setup>
import { onMounted } from 'vue';

function getJavascriptViewPort(): void {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

onMounted(() => {
  getJavascriptViewPort()
  window.addEventListener('resize', () => {
    getJavascriptViewPort()
  })
})
</script>

<template>
  <RouterView />
  <!-- <transition name="zoom-fade">
    <DialogView
      v-if="dialogIsOpened"
      :dialogs="dialogs.current"
      @close="handleDialogClose()"
    />
  </transition>
  <transition name="zoom-fade">
    <IslandView
      v-if="islandViewIsOpened"
      :island="currentIsland"
      @backToMap="handleBackToMap()"
    />
  </transition>
  <WelcomeView v-if="welcomeIsOpened" @play="handleGameStart()" />
  <IslandsView
    v-if="mapIsOpened"
    @selectIsland="handleIslandSelection($event)"
  /> -->
</template>
