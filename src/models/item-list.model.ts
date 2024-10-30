import {Entity, model, property, hasMany} from '@loopback/repository';
import {ItemWithRelations, Item} from './item.model';

@model()
export class ItemList extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @hasMany(() => Item)
  items: Item[];

  constructor(data?: Partial<ItemList>) {
    super(data);
  }
}

export interface ItemListRelations {
  items?: ItemWithRelations[];
}

export type ItemListWithRelations = ItemList & ItemListRelations;
