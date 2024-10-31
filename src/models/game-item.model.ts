import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Game, GameWithRelations} from './game.model';
import {Item, ItemWithRelations} from './item.model';

@model()
export class GameItem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  isCompleted: boolean;

  @belongsTo(() => Game)
  gameId: string;

  @belongsTo(() => Item)
  itemId: string;

  constructor(data?: Partial<GameItem>) {
    super(data);
  }
}

export interface GameItemRelations {
  game?: GameWithRelations;
  item?: ItemWithRelations;
}

export type GameItemWithRelations = GameItem & GameItemRelations;
