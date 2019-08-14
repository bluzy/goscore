import React from 'react';
import { StyleSheet, View, Text, FlatList, } from 'react-native';
import GameResultModal from './modals/gameresult/GameResultModal';
import { Container, List, ListItem, Grid, Row, Col, Spinner, Button, Card, CardItem, Body, Header, Content, Footer } from 'native-base';

import { getGame, saveHistory } from '../utils/db';
import PlayerStateModal from './modals/PlayerStateModal';

export default class GameScreen extends React.Component {

  static navigationOptions = {
    title: 'Game',
  }

  state = {
    gameInfo: null,
    modalOpen: false,
    games: [],
    playerTotal: [],
    stateOpen: null,
  }

  componentWillMount() {
    const { navigation } = this.props;
    const gameId = navigation.getParam('gameId', null);

    getGame(gameId, (game) => {
      this.setState({
        gameInfo: game
      })
    })
  }

  calcTotal = () => {
    const { gameInfo, games } = this.state;

    const totalScores = new Array(gameInfo.players.length);

    for (var i = 0; i < gameInfo.players.length; i++) {
      var score = 0;

      var toScore = new Array(3);
      for (var j = 0; j < toScore.length; j++) {
        toScore[j] = 0;
      }

      games.forEach(g => {
        const me = g.players[i];
        g.players.forEach((p, j) => {
          if (j == i) {
            score += p.calculatedScore;
          } else {
            if (me.winner) {
              toScore[j] += p.calculatedScore;
            } else if (p.winner) {
              toScore[j] -= me.calculatedScore;
            }
          }
        })
      })

      totalScores[i] = {
        player: gameInfo.players[i],
        score: score,
        toScore: toScore.map((t, i) => {
          return {
            player: gameInfo.players[i],
            score: t,
          }
        })
      }
    }

    this.setState({
      playerTotal: totalScores
    });
  }

  render() {
    const { games, gameInfo, playerTotal } = this.state;

    if (gameInfo == null) {
      return (
        <Container>
          <Spinner />
        </Container>
      )
    }

    return (
      <Container>
        <Header>
          <Grid>
            <Row>
              <Text>{gameInfo.title}</Text>
            </Row>
            <Row>
              {playerTotal.map((t, j) => (
                <Card style={{ width: 100 }} onPress={() => this.setState({ stateOpen: j })}>
                  <CardItem header>
                    <Text>{t.player.name}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{`${t.score}점`}</Text>
                    </Body>
                  </CardItem>
                </Card>
              ))}
            </Row>
          </Grid>
        </Header>
        <Content>
          <List>
            {games.map((g, i) => (
              <Grid>
                <Row>
                  {g.players.map((gp, j) => (
                    <Card style={{ width: 100 }} onPress={() => this.setState({ stateOpen: j })}>
                      <CardItem header>
                        <Text>{gp.name}</Text>
                      </CardItem>
                      <CardItem>
                        <Body>
                          <Text>{`${gp.calculatedScore}점`}</Text>
                        </Body>
                      </CardItem>
                    </Card>
                  ))}
                </Row>
              </Grid>
            ))}
          </List>

          <Button onPress={() => this.setState({ modalOpen: true })}>
            <Text>입력</Text>
          </Button>
        </Content>
        {
          this.state.modalOpen &&
          <GameResultModal players={gameInfo.players} onComplete={(game) => {
            saveHistory(game, (g) => {
              console.log(g);
              const games = this.state.games.concat([g]);

              this.setState({
                games: games,
                modalOpen: false,
              }, () => {
                this.calcTotal()
              })
            })

          }} />
        }
        {
          this.state.stateOpen != null &&
          <PlayerStateModal score={this.state.playerTotal[this.state.stateOpen]} onClose={() => { this.setState({ stateOpen: null }) }} />
        }
      </Container>
    )
  }
}