import React from 'react';
import { Container, Content } from 'native-base';

export default class InitScreen extends React.Component {

  constructor(props) {
    const players = [];
    for (var i = 0; i < 3; i++) {
      players.push({
        name: '',
      })
    }
    this.state = {
      mode: 3,
      players: players
    }
  }

  onModeChanged = (mode) => {
    const { mode: currentMode } = this.state;

    var players = this.state.players;

    if (mode < currentMode) {
      players = players.slice(0, mode);
    } else if (mode > currentMode) {
      for (var i = mode; i < currentMode; i++) {
        players.push({
          name: '',
        })
      }
    }

    this.setState({
      mode: mode,
      players: players
    })
  }

  render() {

    return (
      <Container>

        <Content>

        </Content>
      </Container>
    )
  }

}