import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Round, RoundRelations, Game} from '../models';
import {GameRepository} from './game.repository';

export class RoundRepository extends DefaultCrudRepository<
  Round,
  typeof Round.prototype.id,
  RoundRelations
> {

  public readonly game: BelongsToAccessor<Game, typeof Round.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('GameRepository') protected gameRepositoryGetter: Getter<GameRepository>,
  ) {
    super(Round, dataSource);
    this.game = this.createBelongsToAccessorFor('game', gameRepositoryGetter,);
    this.registerInclusionResolver('game', this.game.inclusionResolver);
  }
}
