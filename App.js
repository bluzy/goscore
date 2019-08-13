import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import GameScreen from './screens/GameScreen';

import { initTables } from './utils/db';

const MainNavigator = createStackNavigator({
  Home: Home,
  Game: GameScreen
}, {
    initialRouteName: 'Home'
  });

const App = createAppContainer(MainNavigator);

initTables();

export default App;