import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Game, GameWithRelations} from './game.model';

@model()
export class Team extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
    required: false,
    default: 0,
  })
  point?: number;

  @belongsTo(() => Game)
  gameId: string;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  game?: GameWithRelations;
}

export type TeamWithRelations = Team & TeamRelations;
