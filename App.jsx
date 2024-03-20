import React from 'react'
import Toast, { ErrorToast, SuccessToast } from 'react-native-toast-message'
import MyStack from './routes'
import { RealmProvider } from '@realm/react'
import { Profile } from './app/models/Profile'
import Realm from 'realm'
import store from './app/redux/store'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AppRouters from './app/navigators/AppRouters'
Realm.flags.THROW_ON_GLOBAL_REALM = true

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f0f4f5',
    },
  }
  return (
    <>
      <Provider store={store}>
        <StatusBar style="dark" dark-content />
        <RealmProvider schema={[Profile]}>
          <NavigationContainer theme={MyTheme}>
            <AppRouters />
          </NavigationContainer>
        </RealmProvider>
        <Toast config={toastConfig} />
      </Provider>
    </>
  )
}

export default App

const toastConfig = {
  error: (props) => <ErrorToast {...props} text1NumberOfLines={2} />,
  success: (props) => <SuccessToast {...props} text1NumberOfLines={2} />,
}

;<Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
