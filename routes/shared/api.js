const axios = require("axios");
const urlJoin = require("url-join");

async function api({ basePath, endpoint, method = "GET", data = {} }) {
  const url = urlJoin(basePath, endpoint);
  const response = await axios({
    method,
    url,
    data,
  });
  if (response) {
    return response;
  } else {
    throw Error();
  }
}

module.exports = {
  api: api,
};
