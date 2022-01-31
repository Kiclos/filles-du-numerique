<template>
  <div class="dt-number-link__content">
    <PauseMenu/>
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
import PauseMenu from '@/components/GamesUI/PauseMenu/PauseMenu.vue';

export default defineComponent({
  name: 'NumberLink',
  components: { PauseMenu },
  events: { endGame: () => null },
  setup(_, { emit }) {
    // eslint-disable-next-line no-shadow
    enum PathColor {
      black = 'black',
      blue = 'blue',
      green = 'green',
      purple= 'purple',
      red = 'red',
      yellow = 'yellow'
    }

    interface Case {
      x: number,
      y: number,
      classes: string [],
    }
    interface Row {
      cases: Case []
    }
    interface Grid {
      rows: Row []
    }
    interface Path {
      color: PathColor,
      cases: Case [],
      goal: Case,
    }

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
      return getNeighbors(target).some((n) => n === relative);
    }

    function isGameOver(): boolean {
      return paths.every((p) => isNeighbors(p.goal, p.cases[p.cases.length - 1]) && p.cases.length > 1);
    }

    function getCasePath(c: Case): Path | undefined {
      return paths.find((p) => p.cases.indexOf(c) !== -1);
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
      const pathGoal: Path | undefined = paths.find((p) => p.goal === c);
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
      getNeighbors(c).forEach((item) => {
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
        const pathNeighbors: Case [] = neighbors.filter((n) => {
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

    function getRandomCase(boardSize: number): Case {
      const i = Math.floor(Math.random() * boardSize);
      const j = Math.floor(Math.random() * boardSize);
      return { x: i, y: j, classes: [] };
    }

    function generateRandomPath(gamePaths: Case [][], path: Case []): Case [] {
      let c1: Case;
      if (path.length === 0) {
        c1 = getRandomCase(9);
      } else {
        c1 = path[path.length - 1];
      }
      let c2: Case | undefined = getNeighbors(c1).find((c) => gamePaths.findIndex((p) => p.includes(c)) === -1);
      let it = 1;
      // eslint-disable-next-line no-loop-func
      while ((gamePaths.findIndex((p) => p.includes(c1)) !== -1 || c2 === undefined) && it < 81) {
        c1 = getRandomCase(9);
        c2 = getNeighbors(c1).find((c) => getCasePath(c) === undefined);
        it += 1;
      }
      if (c2 === undefined) {
        throw new Error('unable to generated game');
      }
      if (path.length < 10) {
        path.push(c1);
        path.push(c2);
        try {
          generateRandomPath(gamePaths, path);
        } catch {
          return path;
        }
      }
      return path;
    }

    function generateGame(nb: number): void {
      const generatedPaths: Case [][] = [];
      const newPaths: Path [] = [];
      for (let i = 0; i < nb; i += 1) {
        generatedPaths.push(generateRandomPath(generatedPaths, []));
      }
      console.log(generatedPaths);
      generatedPaths.forEach((path, index) => {
        const first = path[0];
        const last = path[path.length - 1];
        newPaths.push({
          color: Object.values(PathColor)[index % Object.keys(PathColor).length],
          cases: [game.rows[last.x].cases[last.y]],
          goal: game.rows[first.x].cases[first.y],
        });
      });
      paths = newPaths;
    }

    onMounted(() => {
      for (let i = 0; i < 9; i += 1) {
        const row: Row = { cases: [] };

        for (let j = 0; j < 9; j += 1) {
          row.cases.push({ x: i, y: j, classes: [] });
        }
        game.rows.push(row);
      }
      generateGame(6);
      getAllClass();
      console.log(paths, game);
    });

    return {
      game,
      handleSelect,
      getClass,
    };
  },
});
</script>
