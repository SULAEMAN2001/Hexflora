import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import Getting_Started from './Getting_Started'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Getting_Started' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Getting_Started" component={Getting_Started} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Items' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
