import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Team, TeamRelations, Game} from '../models';
import {GameRepository} from './game.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly game: BelongsToAccessor<Game, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GameRepository') protected gameRepositoryGetter: Getter<GameRepository>,
  ) {
    super(Team, dataSource);
    this.game = this.createBelongsToAccessorFor('game', gameRepositoryGetter,);
    this.registerInclusionResolver('game', this.game.inclusionResolver);
  }
}
