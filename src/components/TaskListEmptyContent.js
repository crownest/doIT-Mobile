import React, { Component } from 'react';
import { 
  Image, 
  View,
  StyleSheet,
  Text
} from 'react-native';

class TaskListEmptyContent extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../components/img/school-material.png')}
        />
        <Text style={styles.txt}>To-do list is empty</Text>
        <Text style={styles.txt1}>Add Now</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    paddingTop: 80
  },
  txt: {
    fontSize: 24, 
    color:'#4a4a4a',
    fontWeight: '500',
    marginTop: 20
  },
  txt1: {
    fontSize: 18,
    color:'#4a4a4a',
  }
});
  
export default TaskListEmptyContent;
