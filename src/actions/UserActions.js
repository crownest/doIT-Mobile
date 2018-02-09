import {Alert}  from 'react-native';
import {
    request,
    api_users_url,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
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

  export async function updateUserImage(image) {
    var auth_informations = await getAuthInformations();

    var req = request
      .post(api_users_url + auth_informations.user_id + '/image/update/')
      .set("Authorization", "TOKEN " + auth_informations.auth_token)
      .accept("application/json")
      .attach('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName
      });

    req.end((err, res) => {
      if (err || res.statusCode !== HTTP_200_OK) {
      } else {
        Alert.alert("Your image has been successfully updated.");
      }
    });
  } 
  
  export async function deleteUserImage(user_id,onComplete) {
    var auth_informations = await getAuthInformations();
  
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => {  
          var req =  request
          .del(api_users_url + auth_informations.user_id + '/image/delete/')
          .set("Authorization", "TOKEN " + auth_informations.auth_token)
          .type("application/json")
          .accept("application/json");
      
          req.end((err, res) => {
            if (err || res.statusCode !== HTTP_204_NO_CONTENT) {
              alert("An unexpected error has occurred and try again later.");
            } else {
              onComplete();
              alert("Image deleted.");
            }
          });}
        },
      ],
    );
  }

  export function forgotUserPassword(data, onComplete) {
    return request
      .post(api_users_url + 'password/forgot/')
      .type("application/json")
      .accept("application/json")
      .send(data)
      .end((err, res) => {
        onComplete(res);
      });
  }
