import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {RoundType, RoundTypeRelations} from '../models';

export class RoundTypeRepository extends DefaultCrudRepository<
  RoundType,
  typeof RoundType.prototype.id,
  RoundTypeRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(RoundType, dataSource);
  }
}
