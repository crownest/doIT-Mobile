import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  WebView,
  ScrollView,
  Alert
} from 'react-native';

import {
  request,
  api_url,
  HTTP_201_CREATED,
  api_users_url,
} from "../actions/BaseAction";

import normalize from '../helpers/Normalize';

class Register extends Component {
  state = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  };
    
  clearErrorForm=(res)=>{
    for(var input_name in res.body){
      if(this.refs[input_name]){
        this.refs[input_name].setNativeProps({text: ''});
      } 
    }
  }

  setErrorForm=(res)=>{
    for(var input_name in res.body){
      if(this.refs[input_name]){
        var err_msg = res.body[input_name];
        var fb= input_name + '_feedback';
        this.refs[fb].postMessage(err_msg);
      }
    }   
  }

  createUser(data){
    return request
      .post(api_users_url)
      .type("application/json")
      .accept("application/json")
      .send({
        email: data['email'],
        first_name: data['first_name'],
        last_name: data['last_name'],
        password: data['password'],
        confirm_password: data['confirm_password']
      })
      .end((err, res)=>{
        if (err || res.statusCode !== HTTP_201_CREATED) {
          this.clearErrorForm(res);
          Alert.alert(
            "Please correct the errors and try again!",
          );
          this.setErrorForm(res);
        } else {
          Alert.alert(
            "Your registration was successful. Please verify your email address."
          );
        }
      }
    );
  }

  render() {
    let html= `
        <p id="content" style="color:red; font-size:12px"></p>
        <script>
          document.addEventListener('message', function(e) {
            document.getElementById("content").innerHTML = e.data;
          });
        </script>
        `;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView  behavior={'position'} > 
          <Image
          source={require('../components/img/logo.png')}
          style={styles.logo} 
          /> 
          <View style={{ paddingHorizontal: 32}}>
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
              ref= {'first_name'} style={styles.input}
              placeholder="First Name" underlineColorAndroid= {'transparent'}
              returnKeyLabel= {"next"} value={this.props.first_name}
              onChangeText={(first_name) => this.setState({first_name})}
            />
            <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'first_name_feedback'}/>
            </View>
            <TextInput
              ref= {'last_name'} style={styles.input}
              placeholder="Last Name" underlineColorAndroid= {'transparent'}
              returnKeyLabel= {"next"} value={this.props.last_name}
              onChangeText={(last_name) => this.setState({last_name})}
            />
            <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'last_name_feedback'} />
            </View>
            <TextInput
              ref= {'password'} style={styles.input}
              placeholder="Password" underlineColorAndroid= {'transparent'}
              returnKeyLabel= {"next"} secureTextEntry= {true}
              value={this.props.password} onChangeText={(password) => this.setState({password})}          
            />
            <View style={{width: 500, height:34}}>
              <WebView source={{html : html}} ref= {'password_feedback'}/>
            </View>
            <TextInput
              ref= {'confirm_password'} style={styles.input}
              placeholder="Confirm Password" underlineColorAndroid= {'transparent'}
              returnKeyLabel= {"done"} secureTextEntry= {true}
              value={this.props.confirm_password} onChangeText={(confirm_password) => this.setState({confirm_password})}
            />
            <View style={{width: 500, height: 20}}>
              <WebView source={{html : html}} ref= {'confirm_password_feedback'}/>
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btn} onPress={()=>this.createUser(this.state)}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <Text style={{color:'#7200da'}}>If you have an account </Text>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>
            <Text style={{color:'#fb684b',fontStyle: 'italic'}}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  logo: {
    width: normalize(112),
    height: normalize(87),
    marginTop: normalize(35),
    marginBottom: normalize(25),
    alignSelf: 'center'
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#7200da',
    fontSize: normalize(16),
  },
  btn: {
    borderWidth: 1,
    borderColor: '#7200da',
    height: normalize(44),
    borderRadius: 60,
    justifyContent: 'center',
    paddingVertical: normalize(25),
    marginTop: normalize(20),
    marginBottom: normalize(12),
    marginHorizontal: 32
  },
  btnText:{
    color: '#7200da',
    textAlign: 'center',
    fontSize: normalize(20),
  }
});
  
export default Register;
