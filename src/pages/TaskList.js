import React, { Component } from 'react';
import { 
  Image, 
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import normalize from '../helpers/Normalize';
import Drawer from 'react-native-drawer';
import TaskListEmptyContent from '../components/TaskListEmptyContent';
import TaskListContent from '../components/TaskListContent';
import Navbar from './Navbar';
import {listTask} from '../actions/TaskActions';

class TaskList extends Component {
  state = {
    tasks: []
  };

  componentWillMount() {
     listTask((body) => {
      this.setState({
        tasks: body
      });
    });
  } 

  openNavbar = () => {
    this._drawer.open()
  }

  render() {
    return (
      <Drawer
      ref={(ref) => this._drawer = ref}
      content={<Navbar parent = {this}/>}
      tapToClose={true}
      openDrawerOffset={0.2} 
      >
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Image
              source={require('../components/img/rectangle.png')}
              style={{width: '100%',position: 'absolute'}}
            />
            <View style={styles.menu} >
              <TouchableOpacity onPress={()=>{this.openNavbar()}}>
                <Icon
                  name= 'md-menu'
                  size= {50}
                  color={'#4a4a4a'}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../components/img/new-add.png')}
                  style={{height: 60}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 2}}>
          { 
            (this.state.tasks.length > 0) ?  
            <TaskListContent tasks = {this.state.tasks}/>
            : <TaskListEmptyContent />
          } 
          </View>
        </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffff' 
  },
  menu:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop: normalize(40),
    marginHorizontal: 20
  }
});
  
export default TaskList;
