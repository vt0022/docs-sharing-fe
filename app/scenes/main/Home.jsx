import React from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import { Entypo } from "@expo/vector-icons";
import { useRealm } from "@realm/react";
import { Profile } from "../../models/Profile";
import { useNavigation } from "@react-navigation/native";
import profile from "../../../assets/1989.png";
const Home = () => {
    return (
        <SafeAreaView className="flex-1 bg-[#F5F5F5]">
            <StatusBar backgroundColor="#386BF6" />
            <TopBar />

            <ScrollView className="flex-1">
                <View className="flex-1  mb-16">
                    <View className="bg-white mx-5 mt-5 rounded-2xl p-3">
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center space-x-3">
                                <Image source={profile} className="w-16 h-16 rounded-full" />
                                <Text className="text-base font-bold">Thuận Nguyễn</Text>
                            </View>

                            <View className="flex items-center justify-center">
                                <TouchableOpacity className="bg-[#F1F4F5] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                    <Entypo name="dots-three-horizontal" size={24} color="#99A1BE" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mt-5">
                            <Text className="text-base font-bold mb-3">Tài liệu ôn tập HTML, CSS</Text>

                            <Text className="text-sm text-gray-500">Các anh chị cho em xin tài liệu ôn tập HTML, CSS với ạ!!!</Text>
                        </View>
                    </View>

                    <View className="bg-white mx-5 mt-5 rounded-2xl p-3">
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center  space-x-3">
                                <Image source={require("../../../assets/logo.png")} className="w-16 h-16 rounded-full" />
                                <Text className="text-base font-bold">Thuận Nguyễn</Text>
                            </View>

                            <View className="flex items-center justify-center">
                                <TouchableOpacity className="bg-[#F1F4F5] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                    <Entypo name="dots-three-horizontal" size={24} color="#99A1BE" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mt-5">
                            <Text className="text-base font-bold mb-3">Tài liệu ôn tập HTML, CSS</Text>

                            <Text className="text-sm text-gray-500">Các anh chị cho em xin tài liệu ôn tập HTML, CSS với ạ!!!</Text>
                        </View>
                    </View>

                    <View className="bg-white mx-5 mt-5 rounded-2xl p-3">
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center  space-x-3">
                                <Image source={require("../../../assets/logo.png")} className="w-16 h-16 rounded-full" />
                                <Text className="text-base font-bold">Thuận Nguyễn</Text>
                            </View>

                            <View className="flex items-center justify-center">
                                <TouchableOpacity className="bg-[#F1F4F5] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                    <Entypo name="dots-three-horizontal" size={24} color="#99A1BE" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mt-5">
                            <Text className="text-base font-bold mb-3">Tài liệu ôn tập HTML, CSS</Text>

                            <Text className="text-sm text-gray-500">Các anh chị cho em xin tài liệu ôn tập HTML, CSS với ạ!!!</Text>
                        </View>
                    </View>

                    <View className="bg-white mx-5 mt-5 rounded-2xl p-3">
                        <View className="flex-row justify-between">
                            <View className="flex-row items-center  space-x-3">
                                <Image source={require("../../../assets/logo.png")} className="w-16 h-16 rounded-full" />
                                <Text className="text-base font-bold">Thuận Nguyễn</Text>
                            </View>

                            <View className="flex items-center justify-center">
                                <TouchableOpacity className="bg-[#F1F4F5] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                    <Entypo name="dots-three-horizontal" size={24} color="#99A1BE" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View className="mt-5">
                            <Text className="text-base font-bold mb-3">Tài liệu ôn tập HTML, CSS</Text>

                            <Text className="text-sm text-gray-500">Các anh chị cho em xin tài liệu ôn tập HTML, CSS với ạ!!!</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <NavBar active={1} />
        </SafeAreaView>
    );
};

export default Home;
