import React, { Component } from 'react';
import { 
  Image, 
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';


import {retrieveUser,updateUserImage,deleteUserImage} from '../actions/UserActions';
import Icon from 'react-native-vector-icons/MaterialIcons';

var ImagePicker = require('react-native-image-picker');

var options = {
  title: 'Select Avatar',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

class ChangePhoto extends Component {
  state={
    user:{},
    image: null,
    image_src: null
  }

  componentWillMount(){
    retrieveUser((body) => {
      this.setState({
        user: body,
        image : body.image_128x128
      });
    });
  }

  openImagePicker = () => {
    ImagePicker.launchImageLibrary(options, (response)  => {
      this.setState({image : response.uri, image_src : response });
    });
  }

  onDelete(user_id){
    deleteUserImage(user_id, () =>{
      retrieveUser((body) => {
        this.setState({
          image : body.image_128x128
        });
      });
    });
  }

  render() {
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
        <View style={{height: '100%'}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={()=> this.openImagePicker()}>
              <Image
                source={{uri : this.state.image}}
                style={styles.img}
              />
            </TouchableOpacity>
            <Text style={styles.txt}>{this.state.user.first_name} {this.state.user.last_name}</Text>
            <TouchableOpacity style={{marginBottom: 20}} onPress = {() => updateUserImage(this.state.image_src)}>
              <Image
                source = {require('../components/img/change.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress = {() => this.onDelete(this.state.user.id)}>
              <Image
                source = {require('../components/img/delete.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 30,
    paddingLeft: 16,
    paddingRight: 76
  },
  img: {
    width: 128,
    height: 128,
    borderRadius: 128/2,
    borderColor: '#d4a5ff',
    borderWidth: 7
  },
  txt: {
    marginTop: 15,
    marginBottom: 76,
    fontSize: 25,
    color: '#000000',
  }
});
  
export default ChangePhoto;
