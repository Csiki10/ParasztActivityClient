import {Entity, hasMany, model, property} from '@loopback/repository';
import {GameItem, GameItemWithRelations} from './game-item.model';
import {Round, RoundWithRelations} from './round.model';
import {Team, TeamWithRelations} from './team.model';

@model()
export class Game extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @hasMany(() => Team)
  teams: Team[];

  @hasMany(() => Round)
  rounds: Round[];

  @hasMany(() => GameItem)
  gameItems: GameItem[];

  constructor(data?: Partial<Game>) {
    super(data);
  }
}

export interface GameRelations {
  teams?: TeamWithRelations[];
  rounds?: RoundWithRelations[];
  gameItems?: GameItemWithRelations[];
}

export type GameWithRelations = Game & GameRelations;
