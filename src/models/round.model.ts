import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Game, GameWithRelations} from './game.model';

@model()
export class Round extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'date', // todo fix
    required: true,
  })
  time: string;

  @belongsTo(() => Game)
  gameId: string;

  constructor(data?: Partial<Round>) {
    super(data);
  }
}

export interface RoundRelations {
  game?: GameWithRelations;
}

export type RoundWithRelations = Round & RoundRelations;
