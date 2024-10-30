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
import {Item, ItemList} from '../models';
import {ItemListRepository} from '../repositories';

export class ItemListItemController {
  constructor(
    @repository(ItemListRepository)
    protected itemListRepository: ItemListRepository,
  ) {}

  @get('/item-lists/{id}/items', {
    responses: {
      '200': {
        description: 'Array of ItemList has many Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Item>,
  ): Promise<Item[]> {
    return this.itemListRepository.items(id).find(filter);
  }

  @post('/item-lists/{id}/items', {
    responses: {
      '200': {
        description: 'ItemList model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ItemList.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItemInItemList',
            exclude: ['id'],
            optional: ['itemListId'],
          }),
        },
      },
    })
    item: Omit<Item, 'id'>,
  ): Promise<Item> {
    return this.itemListRepository.items(id).create(item);
  }

  @patch('/item-lists/{id}/items', {
    responses: {
      '200': {
        description: 'ItemList.Item PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Partial<Item>,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.itemListRepository.items(id).patch(item, where);
  }

  @del('/item-lists/{id}/items', {
    responses: {
      '200': {
        description: 'ItemList.Item DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.itemListRepository.items(id).delete(where);
  }
}
