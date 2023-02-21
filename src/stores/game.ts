import { defineStore } from 'pinia'
import { GameStatus, IslandStatus } from '@/Model/GameStatus'
import type { Island } from '@/Model/Island/Island'
import { IslandName } from '@/Model/Island/Island'

interface GameState {
  status: GameStatus
  islands: Island []
}
const localStorageIslands = localStorage.getItem('islands')
export default defineStore('game', {
  state: () => ({
    status: GameStatus.INITIAL_STATE,
    islands: (localStorageIslands != null)
      ? JSON.parse(localStorageIslands)
      : [
          { id: 0, name: IslandName.CARAMBAN, status: IslandStatus.NOT_DISCOVERED, coord: { x: 80, y: 592 } },
          { id: 1, name: IslandName.IAIE, status: IslandStatus.NOT_DISCOVERED, coord: { x: 290, y: 480 } },
          { id: 2, name: IslandName.LOGICIAS, status: IslandStatus.NOT_DISCOVERED, coord: { x: 285, y: 265 } },
          { id: 3, name: IslandName.NETHOSA, status: IslandStatus.NOT_DISCOVERED, coord: { x: 95, y: 0 } },
          { id: 4, name: IslandName.ROBOTIX, status: IslandStatus.NOT_DISCOVERED, coord: { x: 21, y: 430 } },
          { id: 5, name: IslandName.SEGURA, status: IslandStatus.NOT_DISCOVERED, coord: { x: 38, y: 154 } },
        ],
  } as GameState),
  actions: {
    setGameStatus(status: GameStatus): void {
      this.status = status
      localStorage.setItem('gameStatus', JSON.stringify(this.status))
    },
    setIslandStatus(name: IslandName, status: IslandStatus): void {
      const island = this.islands.find(x => x.name === name)
      if (island !== undefined)
        island.status = status

      localStorage.setItem('islands', JSON.stringify(this.islands))
    },
  },
})
