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
import {Game} from '../models';
import {GameRepository} from '../repositories';

export class GameController {
  constructor(
    @repository(GameRepository)
    public gameRepository : GameRepository,
  ) {}

  @post('/games')
  @response(200, {
    description: 'Game model instance',
    content: {'application/json': {schema: getModelSchemaRef(Game)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {
            title: 'NewGame',
            exclude: ['id'],
          }),
        },
      },
    })
    game: Omit<Game, 'id'>,
  ): Promise<Game> {
    return this.gameRepository.create(game);
  }

  @get('/games/count')
  @response(200, {
    description: 'Game model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Game) where?: Where<Game>,
  ): Promise<Count> {
    return this.gameRepository.count(where);
  }

  @get('/games')
  @response(200, {
    description: 'Array of Game model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Game, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Game) filter?: Filter<Game>,
  ): Promise<Game[]> {
    return this.gameRepository.find(filter);
  }

  @patch('/games')
  @response(200, {
    description: 'Game PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {partial: true}),
        },
      },
    })
    game: Game,
    @param.where(Game) where?: Where<Game>,
  ): Promise<Count> {
    return this.gameRepository.updateAll(game, where);
  }

  @get('/games/{id}')
  @response(200, {
    description: 'Game model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Game, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Game, {exclude: 'where'}) filter?: FilterExcludingWhere<Game>
  ): Promise<Game> {
    return this.gameRepository.findById(id, filter);
  }

  @patch('/games/{id}')
  @response(204, {
    description: 'Game PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Game, {partial: true}),
        },
      },
    })
    game: Game,
  ): Promise<void> {
    await this.gameRepository.updateById(id, game);
  }

  @put('/games/{id}')
  @response(204, {
    description: 'Game PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() game: Game,
  ): Promise<void> {
    await this.gameRepository.replaceById(id, game);
  }

  @del('/games/{id}')
  @response(204, {
    description: 'Game DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gameRepository.deleteById(id);
  }
}
