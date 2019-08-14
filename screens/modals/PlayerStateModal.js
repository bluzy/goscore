import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { List, ListItem, Grid, Row, Col, Container, Header, Content, Button, Card, CardItem, Body, Text } from 'native-base';

export default class PlayerStateModal extends React.Component {

  state = {
    result: []
  }

  componentWillMount() {
    const { scores } = this.props;

    const r = [];

    for (var i = 0; i < scores.length; i++) {
      for (var j = 0; j < scores.length; j++) {
        if (i == j) {
          continue;
        }

        const to = scores[i].toScore[j];
        const val = to.score;

        if (val <= 0) {
          continue;
        }

        r.push((
          <Card key={`result_${i}${j}`}>
            <CardItem header>
              <Text>
                {`${scores[i].player.name} -> ${to.player.name}`}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={val > 0 ? style.loserText : val < 0 ? style.winnerText : null}>
                {val}
              </Text>
            </CardItem>
          </Card>
        ))
      }
    }

    this.setState({
      result: r
    })
  }



  render() {
    const { scores, onClose } = this.props;
    const { result } = this.state;

    return (
      <Modal animationType="slide" transparent={false} visible={true}>
        <Container>
          <Header>
            <Text>게임결과</Text>
          </Header>
          <Content>
            {result}

            <Grid>
              <Col size={3}>
                <Button full onPress={() => onClose()}>
                  <Text>닫기</Text>
                </Button>
              </Col>
              <Col size={1}>
                <Button full danger onPress={() => onExit()}>
                  <Text>게임종료</Text>
                </Button>
              </Col>
            </Grid>

          </Content>
        </Container>
      </Modal>
    );
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