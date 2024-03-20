import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import Home from '../scenes/home/Home'
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
const MainNavigator = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={DrawerNavigator} />
    </Stack.Navigator>
  )
}

export default MainNavigator
