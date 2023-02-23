<script lang="ts" setup>
import { inject, nextTick, onMounted, ref, unref } from 'vue'
import { Container } from 'vue-dndrop'
import { useMouse } from '@vueuse/core'

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
defineEmits(['endGame', 'quitGame', 'skipGame'])
const openResultModal = ref(false)
const openUpdate = ref(false)
const bgColor = ref('#16A04D')
const onColorUpdate = (e: any) => (bgColor.value = e.target.value)
const components = ref<DesignComponent[]>([])
const designPreview = ref<any | null>(null)
const designResult = ref<any | null>(null)
const { y } = useMouse()

const steps = [
  {
    target: '#v-step-0', // We're using document.querySelector() under the hood
    header: {
      title: 'Crée ta page de connexion',
    },

    content: `Voici une page de login vierge ! Tu peux la personnaliser en ajoutant des éléments comme des boutons, des champs de texte, des images, etc. Tu peux aussi changer la couleur de fond de la page. `,
  },
  {
    target: '#v-step-1',
    content: "Clique sur le bouton modifier afin d'accéder à la bibliothèque d'éléments",
    header: {
      title: 'Ajoute un élément avec la page de configuration',
    },
  },
  {
    target: '#v-step-2',
    content:
      "fais glisser l`'élément sur la page de résultat et place le où tu veux et reviens pour personnaliser ta page en ajoutant des elements ou en changeant la couleur de fond !",
    header: {
      title: 'Ajoute ton premier élément',
    },
    params: {
      placement: 'top',
    },
  },
]

const onDragStart = async () => {
  document.body.style.overflow = 'hidden'
  openUpdate.value = false
}

const onSubmit = async () => {
  openResultModal.value = true
}
const onDrop = (e: any) => {
  document.body.style.overflow = 'auto'
  components.value = [
    ...components.value,
    {
      y: unref(y) - designPreview?.value?.containerElement.getBoundingClientRect().top - 40,
      tag: e.payload.tag,
      props: { ...e.payload.props, children: e.payload.tag.children },
      id: components.value.length,
    },
  ]
}
const onUndo = () => {
  components.value = components.value.slice(0, components.value.length - 1)
}
const tours: any = inject('tours')
const onUpdateClick = () => {
  nextTick(() => {
    openUpdate.value = true
    setTimeout(() => {
      if (tours?.myTour?.currentStep.value === 1) {
        tours?.myTour?.nextStep()
      }
    }, 200)
  })
}
onMounted(() => {
  tours?.myTour?.start()
})
</script>

<template>
  <PauseMenu
    :color="islandInfos.color"
    @click="() => tours?.myTour?.finish()"
    @skip="$emit('skipGame')"
    @quit="$emit('quitGame')"
  />
  <Game :color="bgColor" :style="`background: ${bgColor}; overflow: hidden; height: 100%`">
    <template #header>
      <div class="flex justify-center mt-5 text-xl">
        <IslandTitle :color="islandInfos.color" :name="islandInfos.islandName">
          Île {{ islandInfos.islandName }}
        </IslandTitle>
      </div>
    </template>
    <template #content>
      <div ref="designResult" class="card flex flex-col">
        <p id="v-step-0" class="loginTitle">Connexion</p>
        <Container
          ref="designPreview"
          group-name="myDrop"
          class="w-full flex-grow"
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
              :color="bgColor"
            ></component>
          </TransitionGroup>
        </Container>

        <BottomSheet :is-open="openUpdate" @on-close="() => (openUpdate = false)">
          <div class="mt-8 flex w-full items-center mb-6 justify-between">
            <p class="text-gray-700 font-semibold">Couleur de fond</p>
            <input
              :value="bgColor"
              class="outline-none p-0 w-24 h-9 border-none rounded-md"
              type="color"
              @change="onColorUpdate"
            />
          </div>
          <div class="grid gap-x-3 gap-y-3 grid-cols-1">
            <DesignDraggableItem class="" @on-drag-start="onDragStart"
              ><InputField class="!cursor-pointer pointer-events-none" label="Email" type="email" />
              <template #displayElement>
                <InputField label="Email" type="email" class="w-full" />
              </template>
            </DesignDraggableItem>

            <DesignDraggableItem class="" @on-drag-start="onDragStart"
              ><InputField
                class="!cursor-pointer pointer-events-none"
                label="Mot de passe"
                type="email"
              />
              <template #displayElement>
                <InputField label="Mot de passe" type="password" class="w-full" />
              </template>
            </DesignDraggableItem>
            <DesignDraggableItem class="" @on-drag-start="onDragStart"
              ><DesignButton
                id="v-step-2"
                :style="`background: ${bgColor}`"
                text="Connexion"
                class="mx-auto pointer-events-none"
              /><template #displayElement
                ><DesignButton text="Connexion" class-name="mb-3"
              /></template>
            </DesignDraggableItem>

            <DesignDraggableItem class="" @on-drag-start="onDragStart"
              ><p class="underline text-gray-500">Mot de passe oublié</p>
              <template #displayElement
                ><p class="mt-8 underline text-gray-500">Mot de passe oublié</p></template
              >
            </DesignDraggableItem>
          </div>

          <Container group-name="myDrop" class="w-full" @drop="onDrop">
            <div></div>
          </Container>
        </BottomSheet>
        <BottomSheet
          :mobile-bar="false"
          height="100vh"
          class-name="mt-16 overflow-scroll w-full h-full !px-0"
          :is-open="openResultModal"
          @on-close="() => (openResultModal = false)"
        >
          <div class="flex h-full justify-center items-center">
            <div>
              <div class="w-full px-6 mb-6 items-center flex justify-between">
                <BackIcon class="cursor-pointer" @click="openResultModal = false" />
                <p class="text-xl font-medium">Beau résultat !</p>
                <div></div>
              </div>
              <div class="w-full px-6 mb-6 flex flex-col items-start">
                <p class="text-gray-800 mb-3">
                  Bravo, vous avez fait votre première page de connexion, vous pouvez revenir en
                  arrière pour la modifier ou partir sur une autre île pour découvrir un autre
                  métier
                </p>
                <!-- <p v-if="components." class="text-gray-800 mb-3">
                
                </p> -->
                <p class="text-gray-800 mb-3">
                  Une page de connexion doit avoir deux champs de texte afin d'y ecrire l'email et
                  le mot de passe, un bouton de connexion et un lien au cas où nous avons oublier le
                  mot de passe. Attention à bien organiser les éléments ainsi que les espacements !
                </p>
                <div class="flex">
                  <button
                    class="flex-grow mr-4 flex items-center text-gray-500 py-2 opacity-90 rounded"
                    @click="openResultModal = false"
                  >
                    <BackIcon class="mr-2" /> Revenir à ma page
                  </button>
                  <button
                    class="flex-grow px-4 py-2 opacity-90 rounded !text-white"
                    :style="`background: ${bgColor}`"
                    @click="$emit('endGame')"
                  >
                    Terminer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div
            v-if="resCanvas"
            class="w-full py-4 flex-grow h-full flex flex-col items-center justify-center"
            :style="`background: ${bgColor}`"
          >
            <img class="rounded-lg" :src="resCanvas" />
          </div> -->
        </BottomSheet>
      </div>
    </template>
    <template #footer>
      <div class="flex items-center mx-8 mb-4">
        <div class="w-16 flex justify-center items-center cursor-pointer" @click="onUndo">
          <UndoIcon class="text-white text-xl" />
        </div>
        <div class="flex flex-grow mr-1 items-stretch">
          <button id="v-step-1" class="flex-grow updateButton" @click="onUpdateClick">
            Modifier
          </button>
        </div>

        <div v-if="components.length" class="flex flex-grow ml-1 items-stretch">
          <button
            class="mb-0 flex-grow updateButton"
            :class="[components.length ? 'opacity-60' : '!opacity-0 pointer-events-none']"
            @click="onSubmit"
          >
            Valider
          </button>
        </div>
      </div>

      <Teleport to="body">
        <v-tour name="myTour" :steps="steps">
          <template #default="tour">
            <transition name="fade">
              <v-step
                v-if="tour.steps[tour.currentStep]"
                :key="tour.currentStep"
                class="!bg-gray-200 !text-gray-800 !rounded-md"
                :step="tour.steps[tour.currentStep]"
                :previous-step="tour.previousStep"
                :next-step="tour.nextStep"
                :stop="tour.stop"
                :skip="tour.skip"
                :is-first="tour.isFirst"
                :is-last="tour.isLast"
                :labels="tour.labels"
              >
                <template v-if="tour.steps[tour.currentStep].header" #header>
                  <button class="font-semibold">
                    {{ tour.steps[tour.currentStep].header.title }}
                  </button>
                </template>
                <template #content>
                  <p class="text-left my-4">{{ tour.steps[tour.currentStep].content }}</p>
                </template>
                <template #actions>
                  <div v-show="tour.currentStep !== 1" class="w-full text-right">
                    <button
                      v-if="!tour.isLast"
                      class="text-right border border-gray-700 px-4 py-2 rounded-md"
                      @click="tour.nextStep"
                    >
                      Suivant
                    </button>
                    <button
                      v-else
                      class="text-right border border-gray-700 px-4 py-2 rounded-md"
                      @click="tour.stop"
                    >
                      Terminer
                    </button>
                  </div>
                </template>
              </v-step>
            </transition>
          </template>
        </v-tour>
      </Teleport>
    </template>
  </Game>
</template>

<style lang="scss" scoped>
.v-step__arrow--dark:before {
  background-color: rgb(229 231 235) !important;
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
  width: calc(100% - 4rem);

  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
}
.dt-game__footer {
  padding: 0 2rem;
}
</style>
