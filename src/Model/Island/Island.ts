import { IslandStatus } from '@/Model/GameStatus';

// eslint-disable-next-line no-shadow
export enum IslandName {
  CARAMBAN= 'Caramban',
  IAIE = 'IAïe',
  LOGICIAS = 'Logicias',
  NETHOSA = 'Nethosa',
  ROBOTIX = 'Robotix',
  SEGURA = 'Segura',
}

export interface Island {
  id: number,
  name: IslandName,
  status: IslandStatus,
  coord: { x: number, y: number },
}
