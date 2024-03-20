import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Profile } from '../scenes/profile/Profile'

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
