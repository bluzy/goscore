import React from 'react';
import { Grid, Row, Col, Left, Right, Icon, ListItem, Body, Picker, Text, Input, Item, Label, Button } from 'native-base';
import { StyleSheet } from 'react-native';

const GoCounts = [
  {
    value: '0',
    name: '0고',
    addScore: 0,
    multiply: 1,
  },
  {
    value: '1',
    name: '1고',
    addScore: 1,
    multiply: 1,
  },
  {
    value: '2',
    name: '2고',
    addScore: 2,
    multiply: 1,
  },
  {
    value: '3',
    name: '3고',
    addScore: 3,
    multiply: 2,
  },
  {
    value: '4',
    name: '4고',
    addScore: 4,
    multiply: 4,
  },
  {
    value: '5',
    name: '5고',
    addScore: 5,
    multiply: 8,
  },
  {
    value: '6',
    name: '6고',
    addScore: 6,
    multiply: 16,
  },
  {
    value: '7',
    name: '7고',
    addScore: 7,
    multiply: 32,
  }
]

export default class WinnerResult extends React.Component {

  state = {
    score: 0,
    go: 0,
    shake: false
  }

  render() {
    const { player, onChange } = this.props;

    return (
      <ListItem>
        <Left>
          <Grid>
            <Row>
              <Text>
                {player.name}
              </Text>
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
              <Item style={{ width: 80 }} floatingLabel >
                <Label>점수</Label>
                <Input type="number" placeholder="점수" value={player.score}
                  onChangeText={(v) => {
                    onChange('score', v)
                  }} />
                <Text>점</Text>
              </Item>
              <Item>
                <Picker mode="dropdown" selectedValue={player.go}
                  onValueChange={(v) => onChange('go', v)}>
                  {GoCounts.map((g, i) => (
                    <Picker.Item key={i} label={g.name} value={g.value} />
                  ))}
                </Picker>
              </Item>
            </Row>
            <Row>
              <Button success transparent={!player.shake}
                onPress={() => onChange('shake', !player.shake)}>
                <Text>흔들기</Text>
              </Button>
            </Row>
          </Grid>
        </Body>
      </ListItem >
    )

  }
}


const styles = StyleSheet.create({
  button: {
    margin: 2
  }
})