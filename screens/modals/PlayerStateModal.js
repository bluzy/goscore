import React from 'react';
import { Modal, Text } from 'react-native';
import { Tab, Tabs, Container, Header, Content, Button, Card, CardItem, Body } from 'native-base';

export default class PlayerStateModal extends React.Component {

  render() {
    const { toScores, onClose } = this.props;

    return (
      <Modal animationType="slide" transparent={false} visible={true}>
        <Container>
          <Header hasTabs />
          <Tabs>
            {toScores.map(score => (
              <Tab heading={score.player.name}>
                {score.toScore.filter(t => t.player.id !== score.player.id).map(t => (
                  <Card>
                    <CardItem header>
                      <Text>{t.player.name}</Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>{t.score}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                ))}
              </Tab>
            ))}
          </Tabs>
          <Button onPress={() => onClose()}>
            <Text>닫기</Text>
          </Button>
        </Container>
      </Modal>
    );
  }
}