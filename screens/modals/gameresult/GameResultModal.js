import React from 'react';
import { View, Text, TextInput, Modal } from 'react-native';
import { Container, Content, Button, CheckBox, ListItem } from 'native-base';
import WinnerResult from './WinnerResult';
import LoserResult from './LoserResult';
import { GoCounts } from '../../../utils/constants';

export default class GameResultModal extends React.Component {

  state = {
    players: [],
    nagari: false,
  }

  componentWillMount() {
    const { players } = this.props;

    this.setState({
      players: players.map(p => ({
        id: p.id,
        name: p.name,
        winner: false,
        pbak: false,
        gbak: false,
        gobak: false,
        score: '0',
        go: '0',
        shake: false,
        calculatedScore: 0,
      })),
    })
  }

  handlePlayerDataChange = (index, name, value) => {
    const players = this.state.players;

    players[index][name] = value;

    this.setState({
      players: players
    }, () => {
      this.calculate();
    });
  }

  setWinner = (index) => {
    this.setState({
      players: this.state.players.map((p, i) => {
        if (i === index) {
          p.winner = true;
        } else {
          p.winner = false;
        }
        return p;
      })
    });
  }

  calculate = () => {
    const { players } = this.state;

    const winnerIndex = players.findIndex(p => p.winner);
    if (winnerIndex < 0) {
      return;
    }

    const winner = players[winnerIndex];

    const go = parseInt(winner.go);
    let addScore = go;
    let multiply = go >= 3 ? Math.pow(2, go - 2) : 1;

    if (winner.shake) {
      multiply *= 2;
    }

    if (this.state.nagari) {
      multiply *= 2;
    }

    const winnerScore = (parseInt(winner.score) + addScore) * multiply;

    const _players = players.map((p, i) => {
      if (i === winnerIndex) {
        p.calculatedScore = winnerScore;
      } else {
        let m = 1;
        if (p.pbak) {
          m *= 2;
        }
        if (p.gbak) {
          m *= 2;
        }
        if (p.gobak) {
          m *= 2;
        }
        p.calculatedScore = -(winnerScore * m);
      }
      return p;
    });

    this.setState({
      players: _players
    })
  }

  render() {
    const { players } = this.state;
    const { onComplete } = this.props;

    return (
      <Modal animationType="slide" transparent={false} visible={true}>
        <Container>
          <Content>
            {players.map((p, i) => (
              p.winner ? (<WinnerResult key={`p_${i}`}
                onSetWinner={() => this.setWinner(i)}
                onChange={(n, v) => this.handlePlayerDataChange(i, n, v)} player={p} />)
                : (<LoserResult key={`p_${i}`}
                  onSetWinner={() => this.setWinner(i)}
                  onChange={(n, v) => this.handlePlayerDataChange(i, n, v)} player={p} />)
            ))}
            <Button onPress={() => onComplete({
              winner: players.find(p => p.winner),
              players: players
            })}>
              <Text>저장</Text>
            </Button>
          </Content>
        </Container>
      </Modal>
    )
  }
}