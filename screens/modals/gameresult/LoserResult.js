import React from 'react';
import { Container, CheckBox, Button, Card, CardItem, Left, Right, Icon, ListItem, Body, Picker, Text, Grid, Row, Col } from 'native-base';
import { View, StyleSheet, TextInput } from 'react-native';

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
        <Left>
          <Grid>
            <Row>
              <Text onPress={onSetWinner}>{player.name}</Text>
            </Row>
            <Row>
              {player.calculatedScore != null && (
                <Text>
                  {`${player.calculatedScore}점`}
                </Text>
              )}
            </Row>
          </Grid>
        </Left>
        <Body>
          <Grid>
            <Row>
              <Col>
                <Button style={styles.button} success transparent={!player.pbak}
                  onPress={() => onChange('pbak', !player.pbak)}>
                  <Text>피박</Text>
                </Button>
              </Col>
              <Col>
                <Button style={styles.button} success transparent={!player.gbak}
                  onPress={() => onChange('gbak', !player.gbak)}>
                  <Text>광박</Text>
                </Button>
              </Col>
              <Col>
                <Button style={styles.button} success transparent={!player.gobak}
                  onPress={() => onChange('gobak', !player.gobak)}>
                  <Text>고박</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Body>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 2
  }
})