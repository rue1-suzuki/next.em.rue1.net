export const defaultRevalidate = 1

export enum ResourceNameEnum {
  EVENTS = 'events',
  PLAYERS = 'players',
  ROUNDS = 'rounds',
  WINNERS = 'winners',
  RESULTS = 'results',
}

export interface AvailableQuery {
  event?: string
}
