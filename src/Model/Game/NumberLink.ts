// eslint-disable-next-line no-shadow
export enum PathColor {
  black = 'black',
  blue = 'blue',
  green = 'green',
  orange= 'orange',
  pink= 'pink',
  purple= 'purple',
  red = 'red',
  yellow = 'yellow'
}

export interface Case {
  x: number,
  y: number,
  classes: string [],
}
export interface Row {
  cases: Case []
}
export interface Grid {
  rows: Row []
}
export interface Path {
  color: PathColor,
  cases: Case [],
  goal: Case,
}
