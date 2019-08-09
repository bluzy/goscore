import React from 'react';
import { StyleSheet, View, Text, FlatList, } from 'react-native';
import GameResultModal from './modals/gameresult/GameResultModal';

export default class GameScreen extends React.Component {

  static navigationOptions = {
    title: 'Game',
  }

  renderItem = ({ item }) => {

  }

  render() {

    return (
      <GameResultModal players={[
        {
          name: '게임1'
        },
        {
          name: '게임2'
        },
        {
          name: '게임3'
        }
      ]} />
    )
  }
}