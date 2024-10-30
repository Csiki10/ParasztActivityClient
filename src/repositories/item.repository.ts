import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Item, ItemRelations, ItemList} from '../models';
import {ItemListRepository} from './item-list.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {

  public readonly itemList: BelongsToAccessor<ItemList, typeof Item.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ItemListRepository') protected itemListRepositoryGetter: Getter<ItemListRepository>,
  ) {
    super(Item, dataSource);
    this.itemList = this.createBelongsToAccessorFor('itemList', itemListRepositoryGetter,);
    this.registerInclusionResolver('itemList', this.itemList.inclusionResolver);
  }
}
