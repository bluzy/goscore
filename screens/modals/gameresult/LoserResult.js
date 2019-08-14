import React from 'react';
import { Container, CheckBox, Button, Card, CardItem, Left, Right, Icon, ListItem, Body, Picker, Text, Grid, Row, Col } from 'native-base';
import { StyleSheet } from 'react-native';

export default class LoserResult extends React.Component {

  state = {
    pbak: false,
    gpak: false,
    gobak: false
  }

  render() {
    const { player, onChange, onSetWinner } = this.props;

    return (
      <ListItem>
        <Grid>
          <Col size={2} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
            <Button small danger onPress={onSetWinner}>
              <Text>
                {"패"}
              </Text>
            </Button>
          </Col>
          <Col size={3}>
            <Row>
              <Text>{player.name}</Text>
            </Row>
            <Row>
              {player.calculatedScore != null && (
                <Text>
                  {`${player.calculatedScore}점`}
                </Text>
              )}
            </Row>
          </Col>
          <Col size={6}>
            <Row>
              <Col>
                <Button style={styles.button} warning={!player.pbak} success={player.pbak} transparent={!player.pbak}
                  onPress={() => onChange('pbak', !player.pbak)}>
                  <Text>피박</Text>
                </Button>
              </Col>
              <Col>
                <Button style={styles.button} warning={!player.gbak} success={player.gbak} transparent={!player.gbak}
                  onPress={() => onChange('gbak', !player.gbak)}>
                  <Text>광박</Text>
                </Button>
              </Col>
              <Col>
                <Button style={styles.button} warning={!player.gobak} success={player.gobak} transparent={!player.gobak}
                  onPress={() => onChange('gobak', !player.gobak)}>
                  <Text>독박</Text>
                </Button>
              </Col>
            </Row>
          </Col>
        </Grid>

      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 2
  }
})