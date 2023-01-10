<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue'
import type { Case, Grid, Path, Row } from '@/Model/Game/NumberLink'
import { PathColor } from '@/Model/Game/NumberLink'

export default defineComponent({
  name: 'NumberLink',
  components: { PauseMenu },
  emits: ['skipGame', 'quitGame', 'endGame'],
  events: {
    skipGame: () => null,
    quitGame: () => null,
    endGame: () => null,
  },
  setup(_, { emit }) {
    const game: Grid = reactive<Grid>({ rows: [] })
    let paths: Path [] = reactive<Path []>([])

    function getNeighbors(c: Case): Case [] {
      const res: Case [] = []
      if (c.x > 0)
        res.push(game.rows[c.x - 1].cases[c.y])

      if (c.x < 8)
        res.push(game.rows[c.x + 1].cases[c.y])

      if (c.y > 0)
        res.push(game.rows[c.x].cases[c.y - 1])

      if (c.y < 8)
        res.push(game.rows[c.x].cases[c.y + 1])

      return res
    }

    function isNeighbors(target: Case, relative: Case): boolean {
      return getNeighbors(target).includes(relative)
    }

    function isGameOver(): boolean {
      return paths.every(p => isNeighbors(p.goal, p.cases[p.cases.length - 1]) && p.cases.length > 0)
    }

    function getCasePath(c: Case): Path | undefined {
      return paths.find(p => p.cases.includes(c))
    }

    function getPositionTo(anchor: Case, relative: Case): string {
      if (anchor.x === relative.x)
        return anchor.y < relative.y ? 'right' : 'left'

      return anchor.x < relative.x ? 'bottom' : 'top'
    }

    function getLineOrientation(path: Path, c: Case): string {
      const index = path.cases.indexOf(c)
      if (path.cases[0] === c)
        return '-first'

      if (path.cases[path.cases.length - 1] === c) {
        if (isNeighbors(path.goal, c))
          return `-${getPositionTo(c, path.cases[index - 1])}-${getPositionTo(c, path.goal)}`

        return `-${getPositionTo(c, path.cases[index - 1])}`
      }
      return `-${getPositionTo(c, path.cases[index - 1])}-${getPositionTo(c, path.cases[index + 1])}`
    }

    function getClass(c: Case): string [] {
      const res: string [] = []
      const path: Path | undefined = getCasePath(c)
      if (path) {
        res.push(`-${path.color}`)
        res.push(getLineOrientation(path, c))
      }
      const pathGoal: Path | undefined = paths.find(p => p.goal === c)
      if (pathGoal) {
        res.push(`-${pathGoal.color}`)
        res.push('-last')
        if (isNeighbors(pathGoal.goal, pathGoal.cases[pathGoal.cases.length - 1]) && pathGoal.cases.length > 0)
          res.push('-complete')
      }
      return res
    }

    function getAllClass(): void {
      for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1)
          game.rows[i].cases[j].classes = getClass(game.rows[i].cases[j])
      }
    }

    function updateNeighborsClass(c: Case) {
      getNeighbors(c).forEach((item) => {
        item.classes = getClass(item)
      })
    }

    function handleSelect(c: Case): void {
      const neighbors: Case [] = getNeighbors(c)
      const casePath: Path | undefined = getCasePath(c)
      if (casePath && casePath.cases[casePath.cases.length - 1] === c && casePath.cases[0] !== c) {
        casePath.cases.splice(casePath.cases.length - 1, 1)

        c.classes = getClass(c)
        updateNeighborsClass(c)
      }
      else if (!casePath) {
        const pathNeighbors: Case [] = neighbors.filter((n) => {
          const path = getCasePath(n)
          if (path)
            return path.cases[path.cases.length - 1] === n

          return false
        })
        if (pathNeighbors.length > 0) {
          const path: Path | undefined = getCasePath(pathNeighbors[0])
          if (path && paths.every(p => p.goal !== c)) {
            path.cases.push(c)

            c.classes = getClass(c)
            updateNeighborsClass(c)
          }
        }
      }
      if (isGameOver())
        emit('endGame')
    }

    function getRandomCase(boardSize: number, forbiddenCases: Case []): Case {
      let res: Case
      do {
        const i = Math.floor(Math.random() * boardSize)
        const j = Math.floor(Math.random() * boardSize)
        res = { x: i, y: j, classes: [] }
      } while (forbiddenCases.findIndex(c => c.x === res.x && c.y === res.y) !== -1)
      return res
    }

    function generateRandomPath(usedCases: Case [], prev: Case | undefined, size: number): Case [] {
      if (size === 0)
        return []

      let c1: Case
      let c2: Case | undefined
      const exploredCases: Case [] = usedCases
      do {
        c1 = prev || getRandomCase(9, exploredCases)
        exploredCases.push(c1)
        c2 = getNeighbors(c1).find(n => exploredCases.findIndex(c => c.x === n.x && c.y === n.y) === -1)
      // eslint-disable-next-line no-unmodified-loop-condition
      } while (c2 === undefined && !prev && exploredCases.length < 81)
      if (c2 === undefined)
        return [c1]

      return [c1].concat(generateRandomPath(exploredCases.concat([c1]), c2, size - 1))
    }

    function generateGame(nb: number): void {
      const newPaths: Path [] = []
      const usedCases: Case [] = []
      for (let i = 0; i < nb; i += 1) {
        const path: Case [] = generateRandomPath(usedCases, undefined, 10)
        if (path.length > 1) {
          usedCases.push(...path)
          const first = path[0]
          const last = path[path.length - 1]
          newPaths.push({
            color: Object.values(PathColor)[i % Object.keys(PathColor).length],
            cases: [game.rows[first.x].cases[first.y]],
            goal: game.rows[last.x].cases[last.y],
          })
        }
      }
      paths = newPaths
    }

    function handleSkipGame(): void {
      emit('skipGame')
    }

    function handleQuitGame(): void {
      emit('quitGame')
    }

    onMounted(() => {
      for (let i = 0; i < 9; i += 1) {
        const row: Row = { cases: [] }

        for (let j = 0; j < 9; j += 1)
          row.cases.push({ x: i, y: j, classes: [] })

        game.rows.push(row)
      }
      const nbPath: number = Math.random() * 3 + 5
      generateGame(nbPath)
      getAllClass()
    })

    return {
      game,
      handleSelect,
      handleSkipGame,
      handleQuitGame,
    }
  },
})
</script>

<template>
  <div class="dt-number-link__content">
    <PauseMenu color="purple" @skip="handleSkipGame()" @quit="handleQuitGame()" />
    <div class="dt-number-link">
      <div v-for="(row, i) in game.rows" :key="`row${i}`" class="dt-number-link__row">
        <div
          v-for="(c, j) in row.cases" :key="`case${j}`"
          class="dt-number-link__case -hoverable"
          :class="c.classes"
          @click="handleSelect(c)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dt-number-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vw;
  width: 100vw;

  @media screen and (orientation:landscape) {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vh;
    width: calc(var(--vh, 1vh) * 100);
  }


  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    background: $white;
    z-index: 2;
  }

  &__row {
    display: flex;
    height: 100%;
    width: 100%;
  }

  &__case {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    color: $white;
    font-size: 1rem;
    box-shadow: inset 1px 1px $light-grey;
    pointer-events: none;
    transition: .3s;

    &:last-child {
      box-shadow: inset 1px 1px $light-grey,inset -1px 0 $light-grey, ;
    }

    &:before {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      content: "";
      height: calc(100% - 20%);
      width: calc(100% - 20%);
      z-index: 2;
    }

    &:after {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      content: "";
      height: 100%;
      width: 100%;
      z-index: 1;

      @media screen and (orientation:landscape) {
        font-size: 1rem;
      }
    }

    &.-block {
      background: $black;
    }

    &.-hoverable {
      pointer-events: initial;
      cursor: pointer;

      &:hover {
        background-color: rgba($light-grey, .3);
      }

      &:active {
        background-color: rgba($light-grey, .6);
      }
    }

    @mixin caseColor($color) {

      &.-first:after {
        background-color: $color;
        border-radius: .5rem;
        font-size: 1.25rem;
      }

      &.-last {
        &:after {
          box-shadow: inset 0 0 0 4px $color;
          color: $color;
          border-radius: .5rem;
          font-size: 1.25rem;
          transition: .3s;
        }

        &.-complete:after {
          background-color: $color;
          color: $white;
        }
      }

      &.-left-right:after, &.-right-left:after, &.-right:after, &.-left:after  {
        background-color: $color;
        height: 20%;
        top: calc(50% - 10%);
        left: 0;
      }

      &.-top-bottom:after, &.-bottom-top:after, &.-top:after, &.-bottom:after  {
        background-color: $color;
        width: 20%;
        top: 0;
        left: calc(50% - 10%);
      }

      &.-left-top, &.-top-left  {

        &:before {
          background-color: $white;
          border-radius: 20%;
          top: -40%;
          left: -40%;
        }

        &:after {
          background-color: $color;
          border-radius: 30%;
          top: -40%;
          left: -40%;
        }
      }

      &.-left-bottom, &.-bottom-left  {
        &:before {
          background-color: $white;
          border-radius: 20%;
          bottom: -40%;
          left: -40%;
        }

        &:after {
          background-color: $color;
          border-radius: 30%;
          bottom: -40%;
          left: -40%;
        }
      }

      &.-right-top, &.-top-right  {
        &:before {
          background-color: $white;
          border-radius: 20%;
          top: -40%;
          right: -40%;
        }

        &:after {
          background-color: $color;
          border-radius: 30%;
          top: -40%;
          right: -40%;
        }
      }

      &.-right-bottom, &.-bottom-right  {
        &:before {
          background-color: $white;
          border-radius: 20%;
          bottom: -40%;
          right: -40%;
        }

        &:after {
          background-color: $color;
          border-radius: 30%;
          bottom: -40%;
          right: -40%;
        }
      }
    }

    &.-black {
      @include caseColor($black);

      &.-first:after, &.-last:after {
        content: "●";
        font-size: 2rem;
      }
    }
    &.-blue {
      @include caseColor($dark-blue);

      &.-first:after, &.-last:after {
        content: "▲";
      }
    }
    &.-red {
      @include caseColor($dark-red);

      &.-first:after, &.-last:after {
        content: "❤";

      }
    }
    &.-green {
      @include caseColor($green);

      &.-first:after, &.-last:after {
        content: "✿";
        font-size: 1.25rem;
      }
    }
    &.-yellow {
      @include caseColor($dark-yellow);

      &.-first:after, &.-last:after {
        content: "✖";
      }
    }
    &.-purple {
      @include caseColor($purple);

      &.-first:after, &.-last:after {
        content: "◼";
        font-size: 1.25rem;
      }
    }
    &.-pink {
      @include caseColor($pink);

      &.-first:after, &.-last:after {
        content: "★";
      }
    }
    &.-orange {
      @include caseColor($orange);

      &.-first:after, &.-last:after {
        content: "◆";
        font-size: 1.75rem;
      }
    }
  }
}
</style>
