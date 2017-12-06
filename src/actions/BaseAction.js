
const request = require("superagent");

const api_url = "http://api.doit.unicrow.com/v1";

const HTTP_200_OK = 200
const HTTP_201_CREATED = 201
const HTTP_204_NO_CONTENT = 204
const HTTP_400_BAD_REQUEST = 400

export{
  request,
  api_url,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
}
