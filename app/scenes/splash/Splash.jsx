import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@realm/react'
import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { Profile } from '../../models/Profile'

const Splash = () => {
  // const navigation = useNavigation()

  // const profile = useQuery(Profile)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     checkLoggedIn()
  //   }, 1000)

  //   return () => clearTimeout(timer) // Xóa timer khi component bị hủy
  // }, [])

  // const checkLoggedIn = () => {
  //   if (profile[0] && profile[0].accessToken) {
  //     navigation.navigate('Home')
  //   } else {
  //     navigation.navigate('Login')
  //   }
  // }

  return (
    <View className="flex-1 items-center justify-center">
      <Image source={require('../../../assets/logo.png')} />
    </View>
  )
}

export default Splash
