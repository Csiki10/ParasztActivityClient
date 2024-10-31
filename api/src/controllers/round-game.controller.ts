import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Round,
  Game,
} from '../models';
import {RoundRepository} from '../repositories';

export class RoundGameController {
  constructor(
    @repository(RoundRepository)
    public roundRepository: RoundRepository,
  ) { }

  @get('/rounds/{id}/game', {
    responses: {
      '200': {
        description: 'Game belonging to Round',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Game),
          },
        },
      },
    },
  })
  async getGame(
    @param.path.string('id') id: typeof Round.prototype.id,
  ): Promise<Game> {
    return this.roundRepository.game(id);
  }
}
