import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Team, TeamRelations} from '../models';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Team, dataSource);
  }
}
