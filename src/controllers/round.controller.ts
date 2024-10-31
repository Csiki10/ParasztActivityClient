import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Round} from '../models';
import {RoundRepository} from '../repositories';

export class RoundController {
  constructor(
    @repository(RoundRepository)
    public roundRepository : RoundRepository,
  ) {}

  @post('/rounds')
  @response(200, {
    description: 'Round model instance',
    content: {'application/json': {schema: getModelSchemaRef(Round)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Round, {
            title: 'NewRound',
            exclude: ['id'],
          }),
        },
      },
    })
    round: Omit<Round, 'id'>,
  ): Promise<Round> {
    return this.roundRepository.create(round);
  }

  @get('/rounds/count')
  @response(200, {
    description: 'Round model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Round) where?: Where<Round>,
  ): Promise<Count> {
    return this.roundRepository.count(where);
  }

  @get('/rounds')
  @response(200, {
    description: 'Array of Round model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Round, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Round) filter?: Filter<Round>,
  ): Promise<Round[]> {
    return this.roundRepository.find(filter);
  }

  @patch('/rounds')
  @response(200, {
    description: 'Round PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Round, {partial: true}),
        },
      },
    })
    round: Round,
    @param.where(Round) where?: Where<Round>,
  ): Promise<Count> {
    return this.roundRepository.updateAll(round, where);
  }

  @get('/rounds/{id}')
  @response(200, {
    description: 'Round model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Round, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Round, {exclude: 'where'}) filter?: FilterExcludingWhere<Round>
  ): Promise<Round> {
    return this.roundRepository.findById(id, filter);
  }

  @patch('/rounds/{id}')
  @response(204, {
    description: 'Round PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Round, {partial: true}),
        },
      },
    })
    round: Round,
  ): Promise<void> {
    await this.roundRepository.updateById(id, round);
  }

  @put('/rounds/{id}')
  @response(204, {
    description: 'Round PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() round: Round,
  ): Promise<void> {
    await this.roundRepository.replaceById(id, round);
  }

  @del('/rounds/{id}')
  @response(204, {
    description: 'Round DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.roundRepository.deleteById(id);
  }
}
