import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Game, GameRelations, Team, Round, GameItem} from '../models';
import {TeamRepository} from './team.repository';
import {RoundRepository} from './round.repository';
import {GameItemRepository} from './game-item.repository';

export class GameRepository extends DefaultCrudRepository<
  Game,
  typeof Game.prototype.id,
  GameRelations
> {

  public readonly teams: HasManyRepositoryFactory<Team, typeof Game.prototype.id>;

  public readonly rounds: HasManyRepositoryFactory<Round, typeof Game.prototype.id>;

  public readonly gameItems: HasManyRepositoryFactory<GameItem, typeof Game.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('RoundRepository') protected roundRepositoryGetter: Getter<RoundRepository>, @repository.getter('GameItemRepository') protected gameItemRepositoryGetter: Getter<GameItemRepository>,
  ) {
    super(Game, dataSource);
    this.gameItems = this.createHasManyRepositoryFactoryFor('gameItems', gameItemRepositoryGetter,);
    this.registerInclusionResolver('gameItems', this.gameItems.inclusionResolver);
    this.rounds = this.createHasManyRepositoryFactoryFor('rounds', roundRepositoryGetter,);
    this.registerInclusionResolver('rounds', this.rounds.inclusionResolver);
    this.teams = this.createHasManyRepositoryFactoryFor('teams', teamRepositoryGetter,);
    this.registerInclusionResolver('teams', this.teams.inclusionResolver);
  }
}
