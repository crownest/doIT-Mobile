import {Alert}  from 'react-native';
import {
    request,
    api_users_url,
    HTTP_200_OK,
    getAuthInformations,
  } from "./BaseAction";

export async function retrieveUser(onComplete) {
    var auth_informations = await getAuthInformations();
  
    var req = request
      .get(api_users_url + auth_informations.user_id + '/')
      .set("Authorization", "token " + auth_informations.auth_token)
      .type("application/json")
      .accept("application/json");

    req.end((err, res) => {
        if (err || res.statusCode !== HTTP_200_OK) {
          Alert.alert("An unexpected error has occurred and try again later.");
        } else {
          onComplete(res.body);
        }
      });
  }