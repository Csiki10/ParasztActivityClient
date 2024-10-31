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
import {GameItem} from '../models';
import {GameItemRepository} from '../repositories';

export class GameItemController {
  constructor(
    @repository(GameItemRepository)
    public gameItemRepository : GameItemRepository,
  ) {}

  @post('/game-items')
  @response(200, {
    description: 'GameItem model instance',
    content: {'application/json': {schema: getModelSchemaRef(GameItem)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameItem, {
            title: 'NewGameItem',
            exclude: ['id'],
          }),
        },
      },
    })
    gameItem: Omit<GameItem, 'id'>,
  ): Promise<GameItem> {
    return this.gameItemRepository.create(gameItem);
  }

  @get('/game-items/count')
  @response(200, {
    description: 'GameItem model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GameItem) where?: Where<GameItem>,
  ): Promise<Count> {
    return this.gameItemRepository.count(where);
  }

  @get('/game-items')
  @response(200, {
    description: 'Array of GameItem model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GameItem, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GameItem) filter?: Filter<GameItem>,
  ): Promise<GameItem[]> {
    return this.gameItemRepository.find(filter);
  }

  @patch('/game-items')
  @response(200, {
    description: 'GameItem PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameItem, {partial: true}),
        },
      },
    })
    gameItem: GameItem,
    @param.where(GameItem) where?: Where<GameItem>,
  ): Promise<Count> {
    return this.gameItemRepository.updateAll(gameItem, where);
  }

  @get('/game-items/{id}')
  @response(200, {
    description: 'GameItem model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GameItem, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GameItem, {exclude: 'where'}) filter?: FilterExcludingWhere<GameItem>
  ): Promise<GameItem> {
    return this.gameItemRepository.findById(id, filter);
  }

  @patch('/game-items/{id}')
  @response(204, {
    description: 'GameItem PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameItem, {partial: true}),
        },
      },
    })
    gameItem: GameItem,
  ): Promise<void> {
    await this.gameItemRepository.updateById(id, gameItem);
  }

  @put('/game-items/{id}')
  @response(204, {
    description: 'GameItem PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gameItem: GameItem,
  ): Promise<void> {
    await this.gameItemRepository.replaceById(id, gameItem);
  }

  @del('/game-items/{id}')
  @response(204, {
    description: 'GameItem DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gameItemRepository.deleteById(id);
  }
}
