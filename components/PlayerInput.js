import React from 'react';
import { Container, Input, Item, Label } from 'native-base';

export default class PlayerInput extends React.Component {


  render() {
    const { name, onNameChange } = this.props;

    return (
      <Item floatingLabel >
        <Label>이름</Label>
        <Input onChangeText={t => onNameChange(t)} value={name} />
      </Item>
    )
  }
}