import React from 'react';
import { Modal } from 'react-native';
import { Container, Content, Button, Grid, Row, Col } from 'native-base';

export default class PlayerStateModal extends React.Component {

  render() {
    const { score } = this.props;

    <Modal animationType="slide" transparent={false} visible={true}>
      <Container>
        <Content>
          <Grid>
            <Row>
              <Text>{score.player.name}</Text>
            </Row>
            {score.toScore.filter(t => t.player.id !== score.player.id).map(t => (
              <Row>
                <Text>{t.player.name}</Text>
                <Text>{t.score}</Text>
              </Row>
            ))}
          </Grid>
        </Content>
      </Container>
    </Modal>
  }
}