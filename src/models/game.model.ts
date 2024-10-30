import {Entity, model, property} from '@loopback/repository';

@model()
export class Game extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  time: string; // todo ez round modelba
  @property({
    type: 'number',
    required: true,
  })
  roundCount: number; // todo ez round modelba / newm kell
  // repo & controller refact

  constructor(data?: Partial<Game>) {
    super(data);
  }
}

export interface GameRelations {
  // describe navigational properties here
}

export type GameWithRelations = Game & GameRelations;
