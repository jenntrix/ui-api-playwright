
export class ApiClient {
    
    constructor(request, apiBaseURL) {
        this.request = request;  
        this.apiBaseURL = apiBaseURL;   
  }

  async get(endpoint, params = {}) {
    const response = await this.request.get(`${this.apiBaseURL}${endpoint}`, {
      params: params,
    });

    return response;
  }

}