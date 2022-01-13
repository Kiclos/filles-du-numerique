<template>
  <div class="dt-number-link">
    <div class="dt-number-link__row" v-for="(row, i) in game.rows" :key="'row' + i">
      <div v-for="(c, j) in row.cases" :key="'case' + j"
          class="dt-number-link__case -hoverable"
           :class="getClass(c)"
          @click="handleSelect(c)">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'NumberLink',
  setup() {
    interface Case {
      x: number,
      y: number,
    }
    interface Row {
      cases: Case []
    }
    interface Grid {
      rows: Row []
    }
    interface Path {
      color: string,
      cases: Case [],
      goal: Case,
    }

    const game: Grid = reactive<Grid>({ rows: [] });
    const paths: Path [] = reactive<Path []>([]);

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
      return paths.every((p) => isNeighbors(p.goal, p.cases[p.cases.length - 1]));
    }

    function getCasePath(c: Case): Path | undefined {
      return paths.find((p) => p.cases.indexOf(c) !== -1);
    }

    function handleSelect(c: Case): void {
      const neighbors: Case [] = getNeighbors(c);
      const casePath: Path | undefined = getCasePath(c);
      if (casePath && casePath.cases[casePath.cases.length - 1] === c && casePath.cases[0] !== c) {
        casePath.cases.splice(casePath.cases.length - 1, 1);
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
          if (path) {
            path.cases.push(c);
          }
        }
      }
      console.log('is game over ?', isGameOver());
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
      }
      return res;
    }

    onMounted(() => {
      for (let i = 0; i < 9; i += 1) {
        const row: Row = { cases: [] };

        for (let j = 0; j < 9; j += 1) {
          row.cases.push({ x: i, y: j });
        }
        game.rows.push(row);
      }
      paths.push({
        color: 'blue',
        cases: [game.rows[0].cases[0]],
        goal: game.rows[5].cases[5],
      });
      paths.push({
        color: 'red',
        cases: [game.rows[8].cases[8]],
        goal: game.rows[6].cases[4],
      });
    });

    return {
      game,
      handleSelect,
      getClass,
    };
  },
});
</script>
