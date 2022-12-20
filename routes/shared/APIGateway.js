const axios = require("axios");
const urlJoin = require("url-join");

class APIGateway {
  static requestHeaders() {
    return {};
  }

  static async request({
    basePath,
    endpoint,
    method = "GET",
    data = {},
    token = null,
  }) {
    const url = urlJoin(basePath, endpoint);

    const headers = this.requestHeaders();
    if (token) {
      headers.Authorization = token;
    }

    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    if (response) {
      return response;
    } else {
      throw Error();
    }
  }
}

module.exports = {
  APIGateway,
};
