import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  GameItem,
  Item,
} from '../models';
import {GameItemRepository} from '../repositories';

export class GameItemItemController {
  constructor(
    @repository(GameItemRepository)
    public gameItemRepository: GameItemRepository,
  ) { }

  @get('/game-items/{id}/item', {
    responses: {
      '200': {
        description: 'Item belonging to GameItem',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Item),
          },
        },
      },
    },
  })
  async getItem(
    @param.path.string('id') id: typeof GameItem.prototype.id,
  ): Promise<Item> {
    return this.gameItemRepository.item(id);
  }
}
