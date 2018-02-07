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

class SettingsInformations extends Component {
  state = {
    email: '',
    first_name: '',
    last_name: ''
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

  onComplete = (body) => {
    this.setState({
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name
    });
  }

  async updateUser(data) {
    var auth_informations = await getAuthInformations();
    console.log(auth_informations)
    var req = request
      .put(api_users_url + auth_informations.user_id + '/')
      .set("Authorization", "TOKEN " + auth_informations.auth_token)
      .type("application/json")
      .accept("application/json")
      .send({
        email: data['email'],
        first_name: data['first_name'],
        last_name: data['last_name']
      });
      
    req.end((err, res)=> {
      if (err || res.statusCode !== HTTP_200_OK) {
        this.clearErrorForm(res);
        Alert.alert("Please correct the errors and try again.");
        this.setErrorForm(res);
      } else {
        Alert.alert("Your informations has been successfully updated.");
        this.onComplete(res.body);
      }
    });
  }

  componentWillMount() {
    retrieveUser((body) => {
      this.setState({
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name
      });
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
            ref= {'email'} style={styles.input}
            placeholder="Email" underlineColorAndroid= {'transparent'}
            returnKeyLabel= {"next"}  defaultValue={this.state.email}
            onChangeText={(email) => this.setState({email})} keyboardType={'email-address'}
          />
          <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'email_feedback'} />
          </View>
          <TextInput
            ref= {'first_name'} style={styles.input}
            placeholder="First Name" underlineColorAndroid= {'transparent'}
            returnKeyLabel= {"next"} defaultValue={this.state.first_name} 
            onChangeText={(first_name) => this.setState({first_name})}          
          />
          <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'first_name_feedback'} />
          </View>
          <TextInput
            ref= {'last_name'} style={styles.input}
            placeholder="Last Name" underlineColorAndroid= {'transparent'}
            returnKeyLabel= {"next"} defaultValue={this.state.last_name}
            onChangeText={(last_name) => this.setState({last_name})}          
          />
          <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'last_name_feedback'} />
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=>this.updateUser(this.state)} >
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
    marginTop: 50
  },
  btnText:{
    color: '#7200da',
    fontSize: normalize(20),
  },
});
  
export default SettingsInformations;
