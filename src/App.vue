<script lang="ts">

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
