import React from 'react';
import GameResultModal from './modals/gameresult/GameResultModal';
import { StyleSheet } from 'react-native';
import { Container, List, ListItem, Grid, Row, Col, Spinner, Button, Card, CardItem, Body, Header, Content, Footer, Text, Right } from 'native-base';

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
    stateOpen: false,
  }

  componentWillMount() {
    const { navigation } = this.props;
    const gameId = navigation.getParam('gameId', null);

    getGame(gameId, (game) => {
      this.setState({
        gameInfo: game,
        playerTotal: game.players.map(p => ({
          player: p,
          score: 0,
          toScore: []
        }))
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
          <Text>{gameInfo.title}</Text>
        </Header>
        <Content>
          <List>
            {games.length > 0 ? games.map((g, i) => (
              <ListItem key={`games_${i}`}>
                <Grid>
                  {g.players.map((gp, j) => (
                    <Col size={1}>
                      <Card>
                        <CardItem header>
                          <Text>{gp.name}</Text>
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text style={gp.winner ? style.winnerText : style.loserText}>{`${gp.calculatedScore}점`}</Text>
                          </Body>
                        </CardItem>
                      </Card>
                    </Col>
                  ))}
                </Grid>
              </ListItem>
            )) : (
                <ListItem>
                  <Text>게임 기록이 없습니다.</Text>
                </ListItem>
              )}
          </List>

          <Grid>
            <Col size={75}>
              <Button style={{ margin: 5 }} full onPress={() => this.setState({ modalOpen: true })}>
                <Text>입력</Text>
              </Button>
            </Col>
            <Col size={25}>
              <Button style={{ margin: 5 }} full onPress={() => this.setState({ stateOpen: true })}>
                <Text>정산</Text>
              </Button>
            </Col>
          </Grid>
        </Content>
        {
          this.state.modalOpen &&
          <GameResultModal players={gameInfo.players} onComplete={(game) => {
            saveHistory(game, (g) => {
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
          this.state.stateOpen &&
          <PlayerStateModal scores={this.state.playerTotal}
            onClose={() => { this.setState({ stateOpen: false }) }}
            onExit={() => {
              alert("byebye");
            }} />
        }
      </Container>
    )
  }
}

const style = StyleSheet.create({
  winnerText: {
    color: '#1E90FF'
  },
  loserText: {
    color: '#DC143C'
  }
})