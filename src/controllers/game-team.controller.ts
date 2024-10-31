import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Game,
  Team,
} from '../models';
import {GameRepository} from '../repositories';

export class GameTeamController {
  constructor(
    @repository(GameRepository) protected gameRepository: GameRepository,
  ) { }

  @get('/games/{id}/teams', {
    responses: {
      '200': {
        description: 'Array of Game has many Team',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Team)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Team>,
  ): Promise<Team[]> {
    return this.gameRepository.teams(id).find(filter);
  }

  @post('/games/{id}/teams', {
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: getModelSchemaRef(Team)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Game.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {
            title: 'NewTeamInGame',
            exclude: ['id'],
            optional: ['gameId']
          }),
        },
      },
    }) team: Omit<Team, 'id'>,
  ): Promise<Team> {
    return this.gameRepository.teams(id).create(team);
  }

  @patch('/games/{id}/teams', {
    responses: {
      '200': {
        description: 'Game.Team PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {partial: true}),
        },
      },
    })
    team: Partial<Team>,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.gameRepository.teams(id).patch(team, where);
  }

  @del('/games/{id}/teams', {
    responses: {
      '200': {
        description: 'Game.Team DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.gameRepository.teams(id).delete(where);
  }
}
