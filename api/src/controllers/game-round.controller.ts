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
  Round,
} from '../models';
import {GameRepository} from '../repositories';

export class GameRoundController {
  constructor(
    @repository(GameRepository) protected gameRepository: GameRepository,
  ) { }

  @get('/games/{id}/rounds', {
    responses: {
      '200': {
        description: 'Array of Game has many Round',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Round)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Round>,
  ): Promise<Round[]> {
    return this.gameRepository.rounds(id).find(filter);
  }

  @post('/games/{id}/rounds', {
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: getModelSchemaRef(Round)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Game.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Round, {
            title: 'NewRoundInGame',
            exclude: ['id'],
            optional: ['gameId']
          }),
        },
      },
    }) round: Omit<Round, 'id'>,
  ): Promise<Round> {
    return this.gameRepository.rounds(id).create(round);
  }

  @patch('/games/{id}/rounds', {
    responses: {
      '200': {
        description: 'Game.Round PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Round, {partial: true}),
        },
      },
    })
    round: Partial<Round>,
    @param.query.object('where', getWhereSchemaFor(Round)) where?: Where<Round>,
  ): Promise<Count> {
    return this.gameRepository.rounds(id).patch(round, where);
  }

  @del('/games/{id}/rounds', {
    responses: {
      '200': {
        description: 'Game.Round DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Round)) where?: Where<Round>,
  ): Promise<Count> {
    return this.gameRepository.rounds(id).delete(where);
  }
}
