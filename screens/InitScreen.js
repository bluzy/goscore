import React from 'react';
import { Container, Content, Button, List, ListItem, Grid, Row, Col, Text } from 'native-base';
import PlayerInput from '../components/PlayerInput';
import { createGame } from '../utils/db';

export default class InitScreen extends React.Component {

  constructor(props) {
    super(props);

    const players = [];
    for (var i = 0; i < 3; i++) {
      players.push({
        name: '',
      })
    }

    this.state = {
      title: '테스트 게임',
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
      for (var i = currentMode; i < mode; i++) {
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

  onPlayerChanged = (index, name, value) => {
    var players = this.state.players;

    players[index][name] = value;
    this.setState({
      players: players
    })
  }

  startGame = () => {
    const { title, players } = this.state;
    const { navigate } = this.props.navigation;

    createGame(title, players, (game) => {
      navigate('CurrentGame', { gameId: game.id })
    }, (err) => {
      alert(err);
    })
  }

  render() {

    return (
      <Container>
        <Content>
          <Grid>
            <Row>
              <Button transparent={this.state.mode !== 3} onPress={() => this.onModeChanged(3)}>
                <Text>3인</Text>
              </Button>
              <Button transparent={this.state.mode !== 2} onPress={() => this.onModeChanged(2)}>
                <Text>2인</Text>
              </Button>
            </Row>

            <Row>
              <List>
                {this.state.players.map((p, i) => (
                  <ListItem key={`player_${i}`}>
                    <PlayerInput name={p.name} onNameChange={(name) => {
                      this.onPlayerChanged(i, 'name', name)
                    }} />
                  </ListItem>
                ))}
              </List>
            </Row>
            <Row>
              <Button onPress={() => this.startGame()}>
                <Text>시작</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }

}