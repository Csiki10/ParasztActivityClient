import {Entity, model, property} from '@loopback/repository';

@model()
export class RoundType extends Entity {
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
  name: string;


  constructor(data?: Partial<RoundType>) {
    super(data);
  }
}

export interface RoundTypeRelations {
  // describe navigational properties here
}

export type RoundTypeWithRelations = RoundType & RoundTypeRelations;
