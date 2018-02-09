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
  HTTP_200_OK,
  HTTP_400_BAD_REQUEST
} from "../actions/BaseAction";

import {forgotUserPassword} from '../actions/UserActions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import normalize from '../helpers/Normalize';

class ForgotPassword extends Component {
  state = {
    email: '',  
  }

  setErrors = (res) => {
    var err_msg = res.body['email'];
    this.refs['email_feedback'].postMessage(err_msg);    
  }
  
  onReset = () => {
    this.setState({email: ''});
  }

  onSubmit = () => {
    var data ={
      email : this.state.email
    };
  forgotUserPassword(data, (res) => {
    if (res) {
      if (res.statusCode === HTTP_200_OK) {
        this.onReset();
        Alert.alert("We sent you a mail.Please check your email address.");
      } else if (res.statusCode === HTTP_400_BAD_REQUEST) {
       this.setErrors(res);
       console.log(res.body);
        Alert.alert("Please correct the errors and try again.");
      } else {
        this.onReset();
        Alert.alert("An unexpected error has occurred and try again later.");
      }
    } else {
      this.onReset();
      Alert.alert("An unexpected error has occurred and try again later.");
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
        <TouchableOpacity style={styles.backspace} onPress={()=>{this.props.navigation.navigate('Login')}}>
            <Icon
              name = 'keyboard-backspace'
              size = {30}
              color = '#7200da'
            />
        </TouchableOpacity>
        <View style={{width: '100%',alignItems:'center',marginBottom: 50}}>
          <Image
            source = {require('../components/img/logo.png')}
            style = {{width: 112, height: 87}}
          />
        </View>
        <View style={{paddingHorizontal : 32}}>
          <TextInput 
            ref= {'email'} style={styles.input}
            placeholder="Email" underlineColorAndroid= {'transparent'}
            returnKeyLabel= {"next"} keyboardType={'email-address'}
            onChangeText={(email) => this.setState({email})}
          />
          <View style={{width: 500, height: 25}}>
              <WebView source={{html : html}} ref= {'email_feedback'} />
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress = {()=>this.onSubmit()} >
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
  backspace: {
    flexDirection: 'row',
    marginTop: 35,
    marginLeft: 16
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
    marginTop: 40
  },
  btnText:{
    color: '#7200da',
    fontSize: normalize(20),
  },
});
  
export default ForgotPassword;
