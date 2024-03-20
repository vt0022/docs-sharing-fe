import React from 'react'
import { Button, Pressable, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { useRealm } from '@realm/react'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'
import { useDispatch } from 'react-redux'
import { removeAuth } from '../redux/reducers/userSlice'
import { appColors } from '../constants/appColors'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const TopBar = () => {
  const realm = useRealm()
  const navigation = createNativeStackNavigator()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(removeAuth())
  }

  return (
    <View
      style={{
        backgroundColor: appColors.primary,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 20,
      }}
    >
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity>
          <Feather name="align-left" size={35} color="white" />
        </TouchableOpacity>

        <Text className="italic text-white text-lg font-medium">Sharing Docs</Text>

        <View className="flex items-center justify-center">
          <TouchableOpacity className="bg-[#F1F4F5] w-[35px] h-[35px] rounded-full flex items-center justify-center">
            <Octicons name="bell-fill" size={18} color="#2D3F7B" />
          </TouchableOpacity>

          {/* <TouchableOpacity className="mt-2" onPress={handleLogout}>
            <AntDesign name="logout" size={25} color="white" />
          </TouchableOpacity> */}
        </View>
      </View>

      <Text className="text-center text-white">Bạn muốn tìm kiếm tài liệu gì?</Text>

      <View className="flex-row justify-between p-5 items-center">
        <View className="flex-row items-center space-x-2">
          <Feather name="search" size={30} color="white" />
          <TextInput placeholder="| Tìm kiếm.." className="text-lg text-white" />
        </View>

        <View>
          <TouchableOpacity className="flex-row bg-[#5D56F3] rounded-full items-center py-1 px-3 space-x-2">
            <Ionicons name="filter-circle" size={26} color="white" />
            <Text className="text-white">Bộ lọc</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Modal isVisible={true} className="flex-1">
                <View className="flex items-center bg-white rounded-xl py-10">
                    <Text className="text-xl font-bold">Bạn có chắc muốn đăng xuất!</Text>

                    <View className="flex justify-around">
                        <TouchableOpacity>
                            <Text>OK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text>Huỷ bỏ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
    </View>
  )
}

export default TopBar
