<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref, unref } from 'vue'
import { Container } from 'vue-dndrop'
import { useMouse } from '@vueuse/core'
import html2canvas from 'html2canvas'

import DesignButton from './Button.vue'
import InputField from './InputFied.vue'

import UndoIcon from '~icons/carbon/undo'
import BackIcon from '~icons/carbon/arrow-left'
import type { IslandInfo } from '@/Model/Island/IslandInfo'
interface DesignComponent {
  y: number
  tag: string
  props: any
  id: number
}
// get some typed props
const { islandInfos } = defineProps<{
  islandInfos: IslandInfo
}>()
defineEmits(['endGame'])
const openResultModal = ref(false)
const openUpdate = ref(false)
const bgColor = ref('#16A04D')
const onColorUpdate = (e: any) => (bgColor.value = e.target.value)
const components = ref<DesignComponent[]>([])
const designPreview = ref()
const designResult = ref()
const resCanvas = ref()
const { y } = useMouse()
const onDragStart = async () => {
  openUpdate.value = false
}

const onSubmit = async () => {
  openResultModal.value = true
  const el = designResult.value
  resCanvas.value = (await html2canvas(el)).toDataURL()
  console.log(resCanvas.value.toDataURL())
}
const onDrop = (e: any) => {
  components.value = [
    ...components.value,
    {
      y: unref(y) - designPreview.value.containerElement.getBoundingClientRect().top - 40,
      tag: e.payload.tag,
      props: { ...e.payload.props, color: bgColor },
      id: components.value.length,
    },
  ]
}
const onUndo = () => {
  components.value = components.value.slice(0, components.value.length - 1)
}
</script>

<template>
  <Game :color="bgColor" :style="`background: ${bgColor}`">
    <template #header>
      <IslandTitle class="upButton" :literal-color="bgColor" :name="islandInfos.islandName">
        Île {{ islandInfos.islandName }}
      </IslandTitle>
    </template>
    <template #content>
      <div ref="designResult" class="card">
        <p class="loginTitle">Connexion</p>
        <Container
          ref="designPreview"
          group-name="myDrop"
          class="h-full w-full"
          :should-animate-drop="() => false"
          @on-drop="onDrop"
        >
          <TransitionGroup tag="div" name="design">
            <component
              :is="component.tag"
              v-for="component in components"
              :key="component.id"
              :style="`top: ${component.y}px; position: absolute;`"
              class=""
              v-bind="component.props"
            />
          </TransitionGroup>
        </Container>

        <BottomSheet :is-open="openUpdate" @on-close="() => (openUpdate = false)">
          <div class="mt-8 flex w-full justify-between">
            <p class="text-gray-700 font-semibold">Couleur de fond</p>
            <input :value="bgColor" type="color" @change="onColorUpdate" />
          </div>

          <DesignDraggableItem class="mb-16" @on-drag-start="onDragStart"
            ><InputField class="!cursor-pointer pointer-events-none" label="Email" type="email" />
            <template #displayElement>
              <InputField label="Email" type="email" class="w-full" />
            </template>
          </DesignDraggableItem>

          <DesignDraggableItem class="mb-16" @on-drag-start="onDragStart"
            ><InputField label="Mot de passe" type="password" />
            <template #displayElement
              ><InputField label="Mot de passe" type="password" class="w-full"
            /></template>
          </DesignDraggableItem>
          <DesignDraggableItem class="" @on-drag-start="onDragStart"
            ><DesignButton
              :style="`background: ${bgColor}`"
              text="Connexion"
              class="mx-auto pointer-events-none"
            /><template #displayElement
              ><DesignButton :style="`background: ${bgColor}`" text="Connexion" class="mx-auto"
            /></template>
          </DesignDraggableItem>

          <Container group-name="myDrop" class="h-full w-full" @drop="onDrop">
            <div></div>
          </Container>
        </BottomSheet>
        <BottomSheet
          :mobile-bar="false"
          height="100vh"
          class-name="pt-6 w-full h-full !px-0"
          :is-open="openResultModal"
          @on-close="() => (openResultModal = false)"
        >
          <div class="w-full px-6 mb-6 items-center flex justify-between">
            <BackIcon class="cursor-pointer" @click="openResultModal = false" />
            <p class="text-xl font-medium">Beau résultat !</p>
            <div></div>
          </div>
          <div class="w-full px-6 mb-6 items-start flex flex-col items-start">
            <p class="text-gray-800 mb-3">
              Bravo, vous avez fais votre première page de connexion, vous pouvez revenir en arrière
              pour la modifier ou partir sur une autre île pour découvrir un autre métier
            </p>
            <button
              class="flex-grow px-4 py-2 opacity-90 rounded !text-white"
              :style="`background: ${bgColor}`"
              @click="$emit('endGame')"
            >
              Terminer
            </button>
          </div>

          <div
            class="w-full py-4 h-full flex flex-col items-center justify-center"
            v-if="resCanvas"
            :style="`background: ${bgColor}`"
          >
            <img class="rounded-lg" :src="resCanvas" />
          </div>
        </BottomSheet>
      </div>
    </template>
    <template #footer>
      <div class="flex mb-4 items-stretch">
        <button class="flex-grow updateButton" @click="openUpdate = true">Modifier</button>
        <div class="w-20 flex justify-center items-center cursor-pointer" @click="onUndo">
          <UndoIcon class="text-white text-xl" />
        </div>
      </div>
      <button
        class="mb-10 flex-grow updateButton"
        :class="[components.length ? 'opacity-60' : '!opacity-0 pointer-events-none']"
        @click="onSubmit"
      >
        Valider
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
.design-enter-active,
.design-leave-active {
  transition: all 0.3s ease;
}
.design-enter-from,
.design-leave-to {
  transform: scale(0.3);
  opacity: 0;
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
  cursor: pointer;
}
</style>

<style>
.dt-game__footer {
  padding: 0 2rem;
}
</style>
