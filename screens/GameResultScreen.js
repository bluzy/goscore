import React from 'react';
import { StyleSheet, View, Text, FlatList, } from 'react-native';
import GameResultModal from './modals/gameresult/GameResultModal';
import { Container, List, ListItem } from 'native-base';

export default class GameScreen extends React.Component {

  static navigationOptions = {
    title: 'Game',
  }

  state = {
    gameInfo: {},
    modalOpen: false,
    games: []
  }

  componentWillMount() {
    const { navigation } = this.props;
    const gameId = navigation.getParam('gameId', null);


  }

  renderItem = ({ item }) => {

  }

  render() {

    return (
      <Container>
        <List>
          {games.map((g, i) => (
            <ListItem key={`l_${i}`}>
              <Text>{g.winner}</Text>
              <Text>{g.score}</Text>
            </ListItem>
          ))}
        </List>
        {
          this.state.modalOpen &&
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
          ]} onComplete={(game) => {
            this.setState({
              game: this.state.game.push(game)
            })
          }} />
        }
      </Container>
    )
  }
}