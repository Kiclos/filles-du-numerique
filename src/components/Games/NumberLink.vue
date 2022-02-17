<template>
  <div class="dt-number-link__content">
    <PauseMenu @skip="handleSkipGame()" @quit="handleQuitGame()" color="purple"/>
    <div class="dt-number-link">
      <div class="dt-number-link__row" v-for="(row, i) in game.rows" :key="'row' + i">
        <div v-for="(c, j) in row.cases" :key="'case' + j"
             class="dt-number-link__case -hoverable"
             :class="c.classes"
             @click="handleSelect(c)">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import PauseMenu from '@/components/Games/GamesUI/PauseMenu/PauseMenu.vue';
import { Grid, Case, PathColor, Path, Row } from '@/Model/Game/NumberLink';

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
    const game: Grid = reactive<Grid>({ rows: [] });
    let paths: Path [] = reactive<Path []>([]);

    function getNeighbors(c: Case): Case [] {
      const res: Case [] = [];
      if (c.x > 0) {
        res.push(game.rows[c.x - 1].cases[c.y]);
      }
      if (c.x < 8) {
        res.push(game.rows[c.x + 1].cases[c.y]);
      }
      if (c.y > 0) {
        res.push(game.rows[c.x].cases[c.y - 1]);
      }
      if (c.y < 8) {
        res.push(game.rows[c.x].cases[c.y + 1]);
      }
      return res;
    }

    function isNeighbors(target: Case, relative: Case): boolean {
      return getNeighbors(target).some(n => n === relative);
    }

    function isGameOver(): boolean {
      return paths.every(p => isNeighbors(p.goal, p.cases[p.cases.length - 1]) && p.cases.length > 1);
    }

    function getCasePath(c: Case): Path | undefined {
      return paths.find(p => p.cases.indexOf(c) !== -1);
    }

    function getPositionTo(anchor: Case, relative: Case): string {
      if (anchor.x === relative.x) {
        return anchor.y < relative.y ? 'right' : 'left';
      }
      return anchor.x < relative.x ? 'bottom' : 'top';
    }

    function getLineOrientation(path: Path, c: Case): string {
      const index = path.cases.indexOf(c);
      if (path.cases[0] === c) {
        return '-first';
      }
      if (path.cases[path.cases.length - 1] === c) {
        if (isNeighbors(path.goal, c)) {
          return `-${getPositionTo(c, path.cases[index - 1])}-${getPositionTo(c, path.goal)}`;
        }
        return `-${getPositionTo(c, path.cases[index - 1])}`;
      }
      return `-${getPositionTo(c, path.cases[index - 1])}-${getPositionTo(c, path.cases[index + 1])}`;
    }

    function getClass(c: Case): string [] {
      const res: string [] = [];
      const path: Path | undefined = getCasePath(c);
      if (path) {
        res.push(`-${path.color}`);
        res.push(getLineOrientation(path, c));
      }
      const pathGoal: Path | undefined = paths.find(p => p.goal === c);
      if (pathGoal) {
        res.push(`-${pathGoal.color}`);
        res.push('-last');
        if (isNeighbors(pathGoal.goal, pathGoal.cases[pathGoal.cases.length - 1]) && pathGoal.cases.length > 1) {
          res.push('-complete');
        }
      }
      return res;
    }

    function getAllClass(): void {
      for (let i = 0; i < 9; i += 1) {
        for (let j = 0; j < 9; j += 1) {
          game.rows[i].cases[j].classes = getClass(game.rows[i].cases[j]);
        }
      }
    }

    function updateNeighborsClass(c: Case) {
      getNeighbors(c).forEach(item => {
        // eslint-disable-next-line no-param-reassign
        item.classes = getClass(item);
      });
    }

    function handleSelect(c: Case): void {
      const neighbors: Case [] = getNeighbors(c);
      const casePath: Path | undefined = getCasePath(c);
      if (casePath && casePath.cases[casePath.cases.length - 1] === c && casePath.cases[0] !== c) {
        casePath.cases.splice(casePath.cases.length - 1, 1);
        // eslint-disable-next-line no-param-reassign
        c.classes = getClass(c);
        updateNeighborsClass(c);
      } else if (!casePath) {
        const pathNeighbors: Case [] = neighbors.filter(n => {
          const path = getCasePath(n);
          if (path) {
            return path.cases[path.cases.length - 1] === n;
          }
          return false;
        });
        if (pathNeighbors.length > 0) {
          const path: Path | undefined = getCasePath(pathNeighbors[0]);
          if (path && c !== path.goal) {
            path.cases.push(c);
            // eslint-disable-next-line no-param-reassign
            c.classes = getClass(c);
            updateNeighborsClass(c);
          }
        }
      }
      if (isGameOver()) {
        console.log('The game is over');
        emit('endGame');
      }
    }

    function getRandomCase(boardSize: number, forbiddenCases: Case []): Case {
      let res: Case;
      do {
        const i = Math.floor(Math.random() * boardSize);
        const j = Math.floor(Math.random() * boardSize);
        res = { x: i, y: j, classes: [] };
        // eslint-disable-next-line no-loop-func
      } while (forbiddenCases.findIndex(c => c.x === res.x && c.y === res.y) !== -1);
      return res;
    }

    function generateRandomPath(usedCases: Case [], prev: Case | undefined, size: number): Case [] {
      if (size === 0) {
        return [];
      }
      let c1: Case;
      let c2: Case | undefined;
      const exploredCases: Case [] = usedCases;
      do {
        c1 = prev || getRandomCase(9, exploredCases);
        exploredCases.push(c1);
        c2 = getNeighbors(c1).find(n => exploredCases.findIndex(c => c.x === n.x && c.y === n.y) === -1);
      } while (c2 === undefined && !prev && exploredCases.length < 81);
      if (c2 === undefined) {
        return [c1];
      }
      return [c1].concat(generateRandomPath(exploredCases.concat([c1]), c2, size - 1));
    }

    function generateGame(nb: number): void {
      const newPaths: Path [] = [];
      const usedCases: Case [] = [];
      for (let i = 0; i < nb; i += 1) {
        const path: Case [] = generateRandomPath(usedCases, undefined, 10);
        if (path.length > 1) {
          usedCases.push(...path);
          console.log(JSON.parse(JSON.stringify(usedCases)));
          const first = path[0];
          const last = path[path.length - 1];
          newPaths.push({
            color: Object.values(PathColor)[i % Object.keys(PathColor).length],
            cases: [game.rows[first.x].cases[first.y]],
            goal: game.rows[last.x].cases[last.y],
          });
        }
      }
      paths = newPaths;
    }

    function handleSkipGame(): void {
      emit('skipGame');
    }

    function handleQuitGame(): void {
      emit('quitGame');
    }

    onMounted(() => {
      for (let i = 0; i < 9; i += 1) {
        const row: Row = { cases: [] };

        for (let j = 0; j < 9; j += 1) {
          row.cases.push({ x: i, y: j, classes: [] });
        }
        game.rows.push(row);
      }
      const nbPath: number = Math.random() * 3 + 5;
      generateGame(nbPath);
      getAllClass();
    });

    return {
      game,
      handleSelect,
      handleSkipGame,
      handleQuitGame,
    };
  },
});
</script>
