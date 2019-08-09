import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'GoScore',
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text>Image</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="Go" onPress={() => navigate('Game')} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
