// eslint-disable-next-line no-shadow
export enum PawnOrientation {
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom',
}

export interface Pawn {
  x: number,
  y: number,
  orientation: PawnOrientation,
}

// eslint-disable-next-line no-shadow
export enum PawnInstruction { moveForward, rotateLeft, rotateRight }
