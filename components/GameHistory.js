import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class GameHistory extends React.Component {

  render() {
    const { item } = this.props;

    return (
      <View style={style.container}>
        <Text>
          {item.winner}
        </Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: left,
    justifyContent: left
  }
})