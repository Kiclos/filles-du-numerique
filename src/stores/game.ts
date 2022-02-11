import { defineStore } from 'pinia';
import { GameStatus, IslandStatus } from '@/Model/GameStatus';
import { Island, IslandName } from '@/Model/Island/Island';

interface GameState {
  status: GameStatus,
  islands: Island [],
}

export default defineStore('game', {
  state: () => ({
    status: GameStatus.INIITAL_STATE,
    islands: [
      { id: 0, name: IslandName.CARAMBAN, status: IslandStatus.NOT_DISCOVERED, coord: { x: 90, y: 592 } },
      { id: 1, name: IslandName.IAIE, status: IslandStatus.NOT_DISCOVERED, coord: { x: 300, y: 480 } },
      { id: 2, name: IslandName.LOGICAS, status: IslandStatus.NOT_DISCOVERED, coord: { x: 295, y: 265 } },
      { id: 3, name: IslandName.NETHOSA, status: IslandStatus.NOT_DISCOVERED, coord: { x: 105, y: 0 } },
      { id: 4, name: IslandName.ROBOTIX, status: IslandStatus.NOT_DISCOVERED, coord: { x: 31, y: 430 } },
      { id: 5, name: IslandName.SEGURA, status: IslandStatus.NOT_DISCOVERED, coord: { x: 48, y: 154 } },
    ],
  } as GameState),
  actions: {
    setGameStatus(status: GameStatus): void {
      this.status = status;
    },
    setIslandStatus(name: IslandName, status: IslandStatus): void {
      const island = this.islands.find(x => x.name === name);
      if (island !== undefined) {
        island.status = status;
      }
    },
  },
});
