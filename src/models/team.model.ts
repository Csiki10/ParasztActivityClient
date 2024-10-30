import {Entity, model, property} from '@loopback/repository';

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
  points?: number;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
