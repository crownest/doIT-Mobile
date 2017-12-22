import React, { Component } from 'react';
import {  
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

import normalize from '../helpers/Normalize';

import {deleteTask} from '../actions/TaskActions';

class TaskListContent extends Component {
  
  setStatusColor = (status) => {
    if(status === 'empty')
      {return {
        backgroundColor: '#9b9b9b',
        width: 5,
        height: 25,
      }
    }
    else if(status === 'uncompleted')
      {return {
        backgroundColor: '#f2a230',
        width: 5,
        height: 25,
      }
    }
    else if(status === 'completed')
      {return {
        backgroundColor: '#75d701',
        width: 5,
        height: 25,
      }
    }    
  }

  render() {
    return(
      <ScrollView>  
        {this.props.tasks.map(task =>
        <View key={task.id} style= {styles.container}>
          <View style={{flexDirection: 'row'}} >
            <View style={this.setStatusColor(task.status) }/>
            <TouchableOpacity>
              <Text style={styles.title}>{task.title}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>{deleteTask(task.id)}}>
            <Image source={require('../components/img/delete-1.png')} />
          </TouchableOpacity>
        </View>
        )}            
      </ScrollView>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 25,
    height: 67,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e1e7'
  },
  title: {
    color: '#4a4a4a',
    fontSize: normalize(20),
    marginLeft: 15
  }
});
  
export default TaskListContent;
