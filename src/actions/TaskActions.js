import {Alert}  from 'react-native';
import {
    request,
    api_tasks_url,
    getAuthInformations,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT
  } from "./BaseAction";
  
  
  export async function listTask(onComplete) {
    var auth_informations = await getAuthInformations();
    var req =  request
      .get(api_tasks_url)
      .set("Authorization", "Token " + auth_informations.auth_token)
      .type("application/json")
      .accept("application/json");
      
    req.end((err,res)=>{
      if (err || res.statusCode !== HTTP_200_OK) {
        alert("An unexpected error has occurred and try again later.");
      } else {
        onComplete(res.body);
      }
    });   
  }

  export async function deleteTask(task_id) {
    var auth_informations = await  getAuthInformations();
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => {  
          var req =  request
            .del(api_tasks_url + task_id + '/')
            .set("Authorization", "TOKEN " + auth_informations.auth_token)
            .type("application/json")
            .accept("application/json");
      
          req.end((err, res) => {
            if (err || res.statusCode !== HTTP_204_NO_CONTENT) {
              alert("An unexpected error has occurred and try again later.");
            } else {
              alert("Task deleted.");
            }
          });
          }
        },
      ],
    );
  }