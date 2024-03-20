import Login from '../scenes/auth/Login'
import Signup from '../scenes/auth/Signup'
import ForgetPassword from '../scenes/auth/ForgetPassword'
import OTP from '../scenes/auth/OTP'
import NewPassword from '../scenes/auth/NewPassword'
import Onboarding from '../scenes/auth/Onboarding'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../scenes/home/Home'

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default AuthNavigator
