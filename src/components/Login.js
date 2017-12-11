import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  WebView
} from 'react-native';

import {
  request,
  url,
  api_url,
  HTTP_201_CREATED,
  HTTP_200_OK
} from "../actions/BaseAction";

const api_auth_login_url = url + '/auth/login/'

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  clearForm=(data)=>{
    for(var input_name in data){
      if(this.refs[input_name]){
        this.refs[input_name].setNativeProps({text: ''});
      } 
    }
  }

  setErrorForm=(res)=>{
    if (res.body.non_field_errors) {
      alert(res.body.non_field_errors);
    }else{
      for(var input_name in res.body){
        if(this.refs[input_name]){
          var err_msg = res.body[input_name];
          var fb= input_name + '_feedback';
          this.refs[fb].postMessage(err_msg);
        }
      } 
    }
  }
  resetForm=()=>{
    this.setState({
      email: "",
      password: ""
    });
    this.refs['email_feedback'].postMessage("");
    this.refs['password_feedback'].postMessage("");
  }
  
  setAuthInformations=(auth_token, user_id)=>{
    if (auth_token && user_id) {
      AsyncStorage.setItem('auth_token', JSON.stringify(auth_token));
      AsyncStorage.setItem('user_id', JSON.stringify(user_id)); 
      return true;
    } else {
      return false;
    }
  }

  authLogin(data) {
    return request
      .post(api_auth_login_url)
      .type("application/json")
      .accept("application/json")
      .send({
        email: data['email'],
        password: data['password']
      })
      .end((err, res)=>{
        if (err || res.statusCode !== HTTP_200_OK) {
          this.clearForm(data);
          alert('Please correct the errors and try again!');
          this.setErrorForm(res);
        } else {
          this.resetForm();
          this.setAuthInformations(res.body.auth_token, res.body.user_id);
        }
      }
    );
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
        <KeyboardAvoidingView  behavior={'position'} >
          <Image
          source={require('./img/logo.png')}
          style={styles.logo} 
          />
          <View style={{paddingHorizontal: 32}}>
            <TextInput 
              ref= {'email'} style={styles.input}
              placeholder="Email" underlineColorAndroid= {'transparent'}
              returnKeyLabel= {"next"} value={this.props.email}
              onChangeText={(email) => this.setState({email})} keyboardType={'email-address'}
            />
            <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'email_feedback'} />
            </View>
            <TextInput
              ref= {'password'} style={styles.input}
              placeholder="Password" underlineColorAndroid= {'transparent'}
              returnKeyLabel= {"next"} secureTextEntry= {true}
              value={this.props.password} onChangeText={(password) => this.setState({password})}          
            />
            <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'password_feedback'}/>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgot_pss}>Forgot Password ?</Text>
            </TouchableOpacity>  
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btn} onPress={()=>this.authLogin(this.state)}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <Text style={{color:'#7200da'}}>Do you have an account yet </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
            <Text style={{color:'#fb684b',fontStyle: 'italic'}}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  logo: {
    width: 112,
    height: 87,
    marginTop: 74,
    marginBottom: 70,
    alignSelf: 'center'
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7200da',
    fontSize: 16
  },
  btn: {
    borderWidth: 1,
    borderColor: '#7200da',
    height: 44,
    borderRadius: 60,
    justifyContent: 'center',
    paddingVertical: 25,
    marginTop: 50,
    marginBottom: 15,
    marginHorizontal: 36
  },
  btnText:{
    color: '#7200da',
    textAlign: 'center',
    fontSize: 20,
  },
  forgot_pss: {
    textAlign: 'right', 
    color: '#9b9b9b',
    fontSize: 13
  }
});
  
export default Login;
