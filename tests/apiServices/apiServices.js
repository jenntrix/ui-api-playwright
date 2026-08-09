import { ApiClient } from '../apiClients/apiClients';

export class ApiService extends ApiClient {
    
  async getAllCharacters() {
    return await this.get('/character');
  }

  async getCharacterByPageSize(page, pageSize) {
    return await this.get(`/character`, { page: page, pageSize: pageSize });
  }

  async getCharacterById(id) {
    return await this.get(`/character`, { id: id });
  }

  async getCharacterByTvShow(tvShows) {
    return await this.get('/character', { tvShows: tvShows });
  }

  async getCharacterByVideoGames(videoGames) {
    return await this.get('/character', { videoGames: videoGames });
  }

  async getInvalidEndpoint() {
    return await this.get('/invalid-endpoint');
}

}