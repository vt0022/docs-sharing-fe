import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/scenes/auth/Login'
import Signup from './app/scenes/auth/Signup'
import { View } from 'react-native'
import ForgetPassword from './app/scenes/auth/ForgetPassword'
import OTP from './app/scenes/auth/OTP'
import NewPassword from './app/scenes/auth/NewPassword'
import Splash1 from './app/scenes/splash/Splash'
import Home from './app/scenes/home/Home'

const Stack = createNativeStackNavigator()

const MyStack = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
    },
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Splash1" component={Splash1} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyStack
