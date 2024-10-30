import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ItemListWithRelations, ItemList} from './item-list.model';

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

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  isComplete?: boolean;

  @belongsTo(() => ItemList)
  itemListId: string;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  itemList?: ItemListWithRelations;
}

export type ItemWithRelations = Item & ItemRelations;
