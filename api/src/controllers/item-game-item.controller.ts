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
  Item,
  GameItem,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemGameItemController {
  constructor(
    @repository(ItemRepository) protected itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/game-items', {
    responses: {
      '200': {
        description: 'Array of Item has many GameItem',
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
    return this.itemRepository.gameItems(id).find(filter);
  }

  @post('/items/{id}/game-items', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: getModelSchemaRef(GameItem)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Item.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameItem, {
            title: 'NewGameItemInItem',
            exclude: ['id'],
            optional: ['itemId']
          }),
        },
      },
    }) gameItem: Omit<GameItem, 'id'>,
  ): Promise<GameItem> {
    return this.itemRepository.gameItems(id).create(gameItem);
  }

  @patch('/items/{id}/game-items', {
    responses: {
      '200': {
        description: 'Item.GameItem PATCH success count',
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
    return this.itemRepository.gameItems(id).patch(gameItem, where);
  }

  @del('/items/{id}/game-items', {
    responses: {
      '200': {
        description: 'Item.GameItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(GameItem)) where?: Where<GameItem>,
  ): Promise<Count> {
    return this.itemRepository.gameItems(id).delete(where);
  }
}
