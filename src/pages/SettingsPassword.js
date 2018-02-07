import React, { Component } from 'react';
import { 
  Image, 
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  WebView,
  Alert
} from 'react-native';

import {
  request,
  api_users_url,
  HTTP_200_OK,
  getAuthInformations,
} from "../actions/BaseAction";

import {retrieveUser} from '../actions/UserActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import normalize from '../helpers/Normalize';

class SettingsPassword extends Component {
  state = {
    old_password: '',
    new_password: '',
    confirm_new_password: ''   
  }

  clearErrorForm = (res) => {
    for(var input_name in res.body){
      if(this.refs[input_name]){
        this.refs[input_name].setNativeProps({text: ''});
      } 
    }
  }

  setErrorForm = (res) => {
    for(var input_name in res.body){
      if(this.refs[input_name]){
        var err_msg = res.body[input_name];
        var fb= input_name + '_feedback';
        this.refs[fb].postMessage(err_msg);
      }
    }   
  }
  
  async changePassword(data) {
    var auth_informations = await getAuthInformations();
  
    var req= request
      .post(api_users_url + auth_informations.user_id + '/password/change/')
      .set("Authorization", "TOKEN " + auth_informations.auth_token)
      .type("application/json")
      .accept("application/json")
      .send({
        old_password: data['old_password'],
        new_password: data['new_password'],
        confirm_new_password: data['confirm_new_password']
      });
      
    req.end((err, res) => {
      console.log(res);
      if (err || res.statusCode !== HTTP_200_OK) {
        this.clearErrorForm(res);
        Alert.alert("Please correct the errors and try again.");
        this.setErrorForm(res);
      } else {
        Alert.alert("Your password has been successfully changed.");
      }
    });
  }

  render() {
    let html= `
    <p id="content" style="color:red; font-size:13px"></p>
    <script>
      document.addEventListener('message', function(e) {
        document.getElementById("content").innerHTML = e.data;
      });
    </script>
    `;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Settings')}}>
            <Icon
              name = 'keyboard-backspace'
              size = {30}
              color = '#7200da'
            />
          </TouchableOpacity>
          <View style={{width: '100%',alignItems:'center'}}>
            <Image
              source = {require('../components/img/doit.png')}
              style = {{width: 62,height: 32}}
            />
          </View>
        </View>
        <View style={{paddingHorizontal : 32}}>
          <TextInput 
            ref= {'old_password'} style={styles.input}
            placeholder="Old Password" underlineColorAndroid= {'transparent'}
            returnKeyLabel= {"next"} secureTextEntry= {true}
            onChangeText={(old_password) => this.setState({old_password})}
          />
          <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'old_password_feedback'} />
          </View>
          <TextInput
            ref= {'new_password'} style={styles.input}
            placeholder="New Password" underlineColorAndroid= {'transparent'}
            returnKeyLabel= {"next"} secureTextEntry= {true}
            onChangeText={(new_password) => this.setState({new_password})}          
          />
          <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'new_password_feedback'} />
          </View>
          <TextInput
            ref= {'confirm_new_password'} style={styles.input}
            placeholder="Confirm New Password" underlineColorAndroid= {'transparent'}
            returnKeyLabel= {"next"} secureTextEntry= {true}
            onChangeText={(confirm_new_password) => this.setState({confirm_new_password})}          
          />
          <View style={{width: 500, height: 40}}>
              <WebView source={{html : html}} ref= {'confirm_new_password_feedback'} />
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=>{this.changePassword(this.state)}} >
          <Text style={styles.btnText}>SEND</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff' 
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
    paddingLeft: 16,
    paddingRight: 76
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7200da',
    fontSize: 16
  },
  btn:{
    borderWidth: 1,
    borderColor: '#7200da',
    height: normalize(44),
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    marginHorizontal:36,
    marginTop: 30
  },
  btnText:{
    color: '#7200da',
    fontSize: normalize(20),
  },
});
  
export default SettingsPassword;
