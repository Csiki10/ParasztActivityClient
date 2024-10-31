import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Team,
  Game,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamGameController {
  constructor(
    @repository(TeamRepository)
    public teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/game', {
    responses: {
      '200': {
        description: 'Game belonging to Team',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Game),
          },
        },
      },
    },
  })
  async getGame(
    @param.path.string('id') id: typeof Team.prototype.id,
  ): Promise<Game> {
    return this.teamRepository.game(id);
  }
}
