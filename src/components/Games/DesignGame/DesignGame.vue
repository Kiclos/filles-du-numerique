<script lang="ts" setup>
import type { IslandInfo } from '@/Model/Island/IslandInfo'

// get some typed props
const { islandInfos } = defineProps<{
  islandInfos: IslandInfo
}>()
</script>

<template>
  <Game :color="islandInfos.color">
    <template #header>
      <IslandTitle class="upButton" :color="islandInfos.color" :name="islandInfos.islandName">
        Île {{ islandInfos.islandName }}
      </IslandTitle>
    </template>
    <template #content>
      <div class="card">
        <p class="loginTitle">
          Connexion
        </p>
      </div>
    </template>
    <template #footer>
      <button class="updateButton">
        Modifier
      </button>
    </template>
  </Game>
</template>

<style lang="scss" scoped>
.upButton {
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 10px;
  flex-grow: 1;
  width: 100%;
  padding: 20px;
  .loginTitle {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 auto;
    padding: 1rem;
    color: $black;
    text-align: center;
  }
}

.updateButton {
  background: white;
  border-radius: 10px;
  opacity: 0.6;
  border: 0;
  outline: 0;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 30px 0 50px 0;
  cursor: pointer;

}
</style>

<style>
.dt-game__footer {
  padding: 0 2rem;

}
</style>
