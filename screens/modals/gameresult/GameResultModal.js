import React from 'react';
import { Modal } from 'react-native';
import { Container, Header, Content, Button, CheckBox, ListItem, Text } from 'native-base';
import WinnerResult from './WinnerResult';
import LoserResult from './LoserResult';
import { GoCounts } from '../../../utils/constants';
import { calculateScore } from '../../../utils/score';

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
    const { players, nagari } = this.state;

    this.setState({
      players: calculateScore(players, nagari)
    })
  }

  render() {
    const { players } = this.state;
    const { onComplete } = this.props;

    return (
      <Modal animationType="slide" transparent={false} visible={true}>
        <Container>
          <Header>
            <Text>결과 입력</Text>
          </Header>
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