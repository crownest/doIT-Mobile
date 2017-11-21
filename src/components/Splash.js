import React, { Component } from 'react';
import { 
  Image, 
  View,
  StyleSheet
} from 'react-native';

class Splash extends Component {
  componentWillMount () {
    setTimeout (() => {
        this.props.navigation.navigate('Register');
    }, 2000); 
}

  render() {
    return (
      <View style={styles.container}>
        <Image
        source={require('./img/bg.png')}
        style={styles.bg}
        />
        <Image
        source={require('./img/logo.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});
  
export default Splash;
