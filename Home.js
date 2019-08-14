import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Body, Button, Text, Grid, Row, Col } from 'native-base';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'GoScore',
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Text>
              {"GoScore"}
            </Text>
          </Body>
        </Header>
        <Content>
          <Text style={{ height: 500 }}>GoScore</Text>
          <Button full onPress={() => navigate('InitGame')}>
            <Text>시작</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 2,
    backgroundColor: '#fff',
  }
});
