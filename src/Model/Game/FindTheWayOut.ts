export enum PawnOrientation {
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom',
}

export interface Pawn {
  x: number
  y: number
  orientation: PawnOrientation
}

export enum PawnInstruction { moveForward, rotateLeft, rotateRight }

export interface Maze {
  grid: number[][] // 1 = wall / 0 = path
  start: [number, number]
  startOrientation: PawnOrientation
  goal: [number, number]
}
