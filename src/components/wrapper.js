const axios = require("axios");

class Wrapper {
  constructor(token) {
    this.token = token;
    this.client = axios.create({
      baseURL: "https://api.github.com/",
      responseType: "json",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + this.token,
      },
    });
  }

  postRequest(path, payload) {
    return this.client.post(path, payload);
  }

  root() {
    return this.getRequest("/");
  }

  async getGistList(path) {
    return this.client.get(path);
  }

  async removeGist(gistId) {
    return this.client.delete(`/gists/${gistId}`);
  }
  // working ↑
  
  async createGist(payload) {
    return this.postRequest("/gists", payload);
  }

  async updateGist(gistId, payload) {
    return this.client.patch(`/gists/${gistId}`, payload);
  }

  async getGist(gistId) {
    return this.getRequest(`/gists/${gistId}`);
  }

}

export default Wrapper;
