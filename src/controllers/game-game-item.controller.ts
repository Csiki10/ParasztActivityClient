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
  GameItem,
} from '../models';
import {GameRepository} from '../repositories';

export class GameGameItemController {
  constructor(
    @repository(GameRepository) protected gameRepository: GameRepository,
  ) { }

  @get('/games/{id}/game-items', {
    responses: {
      '200': {
        description: 'Array of Game has many GameItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(GameItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<GameItem>,
  ): Promise<GameItem[]> {
    return this.gameRepository.gameItems(id).find(filter);
  }

  @post('/games/{id}/game-items', {
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: getModelSchemaRef(GameItem)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Game.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameItem, {
            title: 'NewGameItemInGame',
            exclude: ['id'],
            optional: ['gameId']
          }),
        },
      },
    }) gameItem: Omit<GameItem, 'id'>,
  ): Promise<GameItem> {
    return this.gameRepository.gameItems(id).create(gameItem);
  }

  @patch('/games/{id}/game-items', {
    responses: {
      '200': {
        description: 'Game.GameItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameItem, {partial: true}),
        },
      },
    })
    gameItem: Partial<GameItem>,
    @param.query.object('where', getWhereSchemaFor(GameItem)) where?: Where<GameItem>,
  ): Promise<Count> {
    return this.gameRepository.gameItems(id).patch(gameItem, where);
  }

  @del('/games/{id}/game-items', {
    responses: {
      '200': {
        description: 'Game.GameItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(GameItem)) where?: Where<GameItem>,
  ): Promise<Count> {
    return this.gameRepository.gameItems(id).delete(where);
  }
}
