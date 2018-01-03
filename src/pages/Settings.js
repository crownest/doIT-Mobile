import React, { Component } from 'react';
import { 
  Image, 
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import normalize from '../helpers/Normalize';

class Settings extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TaskList')}}>
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
        <View style={styles.setting}>
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SettingsInformations')}}>
            <Text style={styles.settingTitle} >Change Informations</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <TouchableOpacity>
            <Text style={styles.settingTitle} >Change Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.setting}>
          <TouchableOpacity>
            <Text style={styles.settingTitle} >Change Photo</Text>
          </TouchableOpacity>
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
    marginVertical: 30,
    paddingLeft: 16,
    paddingRight: 76
  },
  setting: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#f7f7f7',
    paddingVertical: 15
  },
  settingTitle: {
    color: '#7200da',
    fontSize: 20,
    letterSpacing: -0.8    
  }
});
  
export default Settings;
