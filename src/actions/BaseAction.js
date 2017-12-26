import { AsyncStorage } from 'react-native';

const request = require("superagent");

const url = "http://api.doit.unicrow.com";
const api_url = url + "/v1";
const api_users_url = api_url + '/users/';
const api_tasks_url = api_url + '/tasks/';

const HTTP_200_OK = 200
const HTTP_201_CREATED = 201
const HTTP_204_NO_CONTENT = 204
const HTTP_400_BAD_REQUEST = 400

async function getAuthInformations() {
  var auth_informations = {
    "auth_token": await AsyncStorage.getItem('auth_token'),
    "user_id": await AsyncStorage.getItem('user_id')
  }
  return auth_informations;
}

export{
  request,
  url,
  api_url,
  api_users_url,
  api_tasks_url,
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
  getAuthInformations
}
