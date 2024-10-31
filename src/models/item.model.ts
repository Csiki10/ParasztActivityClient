import {Entity, hasMany, model, property} from '@loopback/repository';
import {GameItem, GameItemWithRelations} from './game-item.model';

@model()
export class Item extends Entity {
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

  @hasMany(() => GameItem)
  gameItems: GameItem[];

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  gameItems?: GameItemWithRelations[];
}

export type ItemWithRelations = Item & ItemRelations;
