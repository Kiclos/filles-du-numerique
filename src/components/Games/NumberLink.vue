<template>
  <div class="dt-number-link">
    <div class="dt-number-link__row" v-for="i in 9" :key="i">
      <div v-for="j in 9" :key="j"
          class="dt-number-link__case"
          :class="getClass(i, j)"
          @click="handleSelect(i, j)">
        {{ getLineOrientation(i, j) === '-first' ? '⭐️' : '' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'NumberLink',
  setup() {
    const path = reactive< number [] []>([[1, 1]]);

    function areNeighbor(case1: number [], case2: number []): boolean {
      if (case1[0] === case2[0] - 1 || case1[0] === case2[0] + 1) {
        return case1[1] === case2[1];
      }
      if (case1[1] === case2[1] - 1 || case1[1] === case2[1] + 1) {
        return case1[0] === case2[0];
      }
      return false;
    }

    function handleSelect(i: number, j: number): void {
      const index: number = path.findIndex((x) => x[0] === i && x[1] === j);
      if (index === path.length - 1) {
        path.splice(index, 1);
      } else {
        const isNeighbors: boolean = areNeighbor(path[path.length - 1], [i, j]);
        if (isNeighbors) {
          path.push([i, j]);
        }
      }
    }

    function getPositionTo(anchor: number [], relative: number[]): string {
      if (anchor[0] === relative[0]) {
        return anchor[1] < relative[1] ? 'right' : 'left';
      }
      return anchor[0] < relative[0] ? 'bottom' : 'top';
    }

    function getLineOrientation(i: number, j: number): string {
      const index: number = path.findIndex((x) => x[0] === i && x[1] === j);
      if (index === -1) {
        return '';
      }
      if (index === 0) {
        return '-first';
      }
      if (index === path.length - 1) {
        return `-${getPositionTo(path[index], path[index - 1])}`;
      }
      return `-${getPositionTo(path[index], path[index - 1])}-${getPositionTo(path[index], path[index + 1])}`;
    }

    function getClass(i: number, j: number): string [] {
      const res: string [] = [];
      const isNeighbors: boolean = areNeighbor(path[path.length - 1], [i, j]);
      const index = path.findIndex((x) => x[0] === i && x[1] === j);
      if ((isNeighbors && index === -1) || (index === path.length - 1 && index !== 0)) {
        res.push('-hoverable');
      }
      if (index !== -1) {
        res.push('-selected');
      }
      res.push(getLineOrientation(i, j));
      return res;
    }

    return {
      path,
      handleSelect,
      getClass,
      getLineOrientation,
    };
  },
});
</script>
