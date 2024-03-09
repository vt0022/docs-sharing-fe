import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../../components/NavBar";
import TopBar from "../../components/TopBar";
import { Entypo } from "@expo/vector-icons";
import { useRealm } from "@realm/react";
import { Profile } from "../../models/Profile";
import { useNavigation } from "@react-navigation/native";
import profile from "../../../assets/default_avatar.webp";
import usePrivateAxios from "../../api/axios/usePrivateAxios";
import { getPosts } from "../../api/rest/post";
import Toast from "react-native-toast-message";
const Home = () => {
    usePrivateAxios();

    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getPostList();
    }, [page, size]);

    const onRefresh = () => {
        setRefreshing(true);
        getPostList();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const getPostList = async () => {
        const response = await getPosts({
            params: {
                page: page,
                size: size,
            },
        });

        if (response.status === 200) {
            setPostList(response.data.content);
        } else {
            Toast.show({
                type: "error",
                text1: "Vui lòng thử lại sau!",
            });
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F5F5F5]">
            <TopBar />

            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                className="flex-1 mb-16"
                data={postList}
                renderItem={({ item }) => {
                    return (
                        <View className="bg-white mx-5 mt-5 rounded-2xl p-3">
                            <View className="flex-row justify-between">
                                <View className="flex-row items-center space-x-3">
                                    {item.user.image ? <Image source={{ uri: item.user.image }} style={{ width: 70, height: 70, borderRadius: 50 }} /> : <Image source={profile} style={{ width: 70, height: 70, borderRadius: 50 }} />}
                                    <Text className="text-base font-bold">{item.user.firstName}</Text>
                                </View>

                                <View className="flex items-center justify-center">
                                    <TouchableOpacity className="bg-[#F1F4F5] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                        <Entypo name="dots-three-horizontal" size={24} color="#99A1BE" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className="mt-5">
                                <Text className="text-base font-bold mb-3">{item.title}</Text>

                                <Text className="text-sm text-gray-500">{item.content}</Text>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.postId}
            />

            <NavBar active={1} />
        </SafeAreaView>
    );
};

export default Home;
