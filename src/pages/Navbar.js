import React, { Component } from 'react';
import {  
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {retrieveUser} from '../actions/UserActions';
import normalize from '../helpers/Normalize';
import RNRestart from 'react-native-restart';

class Navbar extends Component {
  state={
    user:{}
  }
  
  componentWillMount(){
    retrieveUser((body) => {
      this.setState({
        user: body
      });
    });
  }

  logOut = () => {
    AsyncStorage.clear();
    RNRestart.Restart();
  }
  
  render() {
    return(
      <View style= {styles.container}>
        <View style={styles.header}>
          <Image
            source={{uri : this.state.user.image_128x128}}
            style={styles.img}
          />
          <Text style={styles.txt}>{this.state.user.first_name} {this.state.user.last_name}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.element} onPress = {()=>{this.props.parent.props.navigation.navigate('Settings')}}>
            <Image
              source={require('../components/img/settings.png')}
              style={{marginRight: 30, width: 30, height: 30 }}
            />
            <Text style={styles.txt}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.element} onPress={()=>{this.logOut()}}>
            <Icon
              name = 'md-log-out'
              size = {35}
              color = '#d0021b'
              style={{marginRight: 30 }}
            />
            <Text style={styles.txt}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );     
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffff'
  },
  header: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
    paddingVertical: 30
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: 128/2,
    borderColor: '#d4a5ff',
    borderWidth: 7,
    marginBottom: 16
  },
  txt: {
    fontSize: normalize(25),
    color: '#000000'
  },
  footer:{
    flex:2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 40 
  },
  element: {
    flexDirection: 'row', 
    marginVertical: 5, 
    alignItems: 'center'
  }
});
  
export default Navbar;