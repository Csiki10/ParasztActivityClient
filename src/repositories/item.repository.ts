import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {GameItem, Item, ItemRelations} from '../models';
import {GameItemRepository} from './game-item.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {
  public readonly gameItems: HasManyRepositoryFactory<
    GameItem,
    typeof Item.prototype.id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('GameItemRepository')
    protected gameItemRepositoryGetter: Getter<GameItemRepository>,
  ) {
    super(Item, dataSource);
    this.gameItems = this.createHasManyRepositoryFactoryFor(
      'gameItems',
      gameItemRepositoryGetter,
    );
    this.registerInclusionResolver(
      'gameItems',
      this.gameItems.inclusionResolver,
    );
  }
}
