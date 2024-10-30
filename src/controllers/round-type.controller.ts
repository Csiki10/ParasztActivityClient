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
import {RoundType} from '../models';
import {RoundTypeRepository} from '../repositories';

export class RoundTypeController {
  constructor(
    @repository(RoundTypeRepository)
    public roundTypeRepository : RoundTypeRepository,
  ) {}

  @post('/round-types')
  @response(200, {
    description: 'RoundType model instance',
    content: {'application/json': {schema: getModelSchemaRef(RoundType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoundType, {
            title: 'NewRoundType',
            exclude: ['id'],
          }),
        },
      },
    })
    roundType: Omit<RoundType, 'id'>,
  ): Promise<RoundType> {
    return this.roundTypeRepository.create(roundType);
  }

  @get('/round-types/count')
  @response(200, {
    description: 'RoundType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RoundType) where?: Where<RoundType>,
  ): Promise<Count> {
    return this.roundTypeRepository.count(where);
  }

  @get('/round-types')
  @response(200, {
    description: 'Array of RoundType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RoundType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RoundType) filter?: Filter<RoundType>,
  ): Promise<RoundType[]> {
    return this.roundTypeRepository.find(filter);
  }

  @patch('/round-types')
  @response(200, {
    description: 'RoundType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoundType, {partial: true}),
        },
      },
    })
    roundType: RoundType,
    @param.where(RoundType) where?: Where<RoundType>,
  ): Promise<Count> {
    return this.roundTypeRepository.updateAll(roundType, where);
  }

  @get('/round-types/{id}')
  @response(200, {
    description: 'RoundType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RoundType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RoundType, {exclude: 'where'}) filter?: FilterExcludingWhere<RoundType>
  ): Promise<RoundType> {
    return this.roundTypeRepository.findById(id, filter);
  }

  @patch('/round-types/{id}')
  @response(204, {
    description: 'RoundType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoundType, {partial: true}),
        },
      },
    })
    roundType: RoundType,
  ): Promise<void> {
    await this.roundTypeRepository.updateById(id, roundType);
  }

  @put('/round-types/{id}')
  @response(204, {
    description: 'RoundType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() roundType: RoundType,
  ): Promise<void> {
    await this.roundTypeRepository.replaceById(id, roundType);
  }

  @del('/round-types/{id}')
  @response(204, {
    description: 'RoundType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.roundTypeRepository.deleteById(id);
  }
}
