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
  Game,
} from '../models';
import {GameItemRepository} from '../repositories';

export class GameItemGameController {
  constructor(
    @repository(GameItemRepository)
    public gameItemRepository: GameItemRepository,
  ) { }

  @get('/game-items/{id}/game', {
    responses: {
      '200': {
        description: 'Game belonging to GameItem',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Game),
          },
        },
      },
    },
  })
  async getGame(
    @param.path.string('id') id: typeof GameItem.prototype.id,
  ): Promise<Game> {
    return this.gameItemRepository.game(id);
  }
}
