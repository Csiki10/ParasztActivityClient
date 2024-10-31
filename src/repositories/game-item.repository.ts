import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {GameItem, GameItemRelations, Game, Item} from '../models';
import {GameRepository} from './game.repository';
import {ItemRepository} from './item.repository';

export class GameItemRepository extends DefaultCrudRepository<
  GameItem,
  typeof GameItem.prototype.id,
  GameItemRelations
> {

  public readonly game: BelongsToAccessor<Game, typeof GameItem.prototype.id>;

  public readonly item: BelongsToAccessor<Item, typeof GameItem.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GameRepository') protected gameRepositoryGetter: Getter<GameRepository>, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(GameItem, dataSource);
    this.item = this.createBelongsToAccessorFor('item', itemRepositoryGetter,);
    this.registerInclusionResolver('item', this.item.inclusionResolver);
    this.game = this.createBelongsToAccessorFor('game', gameRepositoryGetter,);
    this.registerInclusionResolver('game', this.game.inclusionResolver);
  }
}
