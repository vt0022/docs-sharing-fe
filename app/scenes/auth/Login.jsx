import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { login } from "../../api/rest/auth";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { getProfile } from "../../api/rest/user";
import usePrivateAxios from "../../api/axios/usePrivateAxios";
import { addProfile } from "../../services/RealM";
import { Profile } from "../../models/Profile";
import { useQuery, useRealm } from "@realm/react";
import { BSON } from "realm";
import Spinner from "react-native-loading-spinner-overlay";

const Login = () => {
    //usePrivateAxios();

    const realm = useRealm();

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMessage("");
        setStatus(0);
    }, [email, password]);

    useEffect(() => {
        status !== 0 && message !== "" ? showToast() : null;
    }, [status, message]);

    const addProfile = (password, email, accessToken, refreshToken) => {
        realm.write(() => {
            realm.create(Profile, {
                _id: new BSON.ObjectId(),
                password: password,
                email: email,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        });
    };

    const profile = useQuery(Profile);

    const updateProfile = (firstName, lastName, dateOfBirth, gender, image) => {
        realm.write(() => {
            profile[0].firstName = firstName;
            profile[0].lastName = lastName;
            profile[0].dateOfBirth = dateOfBirth;
            profile[0].gender = gender;
            profile[0].image = image;
        });
    };

    const showToast = () => {
        Toast.show({
            type: status === -1 ? "error" : "success",
            text1: message,
        });
        setMessage("");
    };

    const handleLogin = async () => {
        setLoading(true);

        const response = await login({
            email: email,
            password: password,
        });

        setLoading(false);

        if (response.message === "Email not registered") {
            setMessage("Email không đúng!");
            setStatus(-1);
        } else if (response.message === "Wrong password") {
            setMessage("Mật khẩu không đúng!");
            setStatus(-1);
        } else if (response.status === 400) {
            setMessage("Có lỗi xảy ra! Vui lòng thử lại sau!");
            setStatus(-1);
        } else {
            realm.write(() => {
                realm.deleteAll(); // hoặc realm.deleteAllData()
            });
            addProfile("********", email, response.data.accessToken, response.data.refreshToken);

            const config = {
                headers: { Authorization: `Bearer ${response.data.accessToken}` },
            };

            const res = await getProfile(config);

            if (res.status === 200) {
                updateProfile(res.data.firstName, res.data.lastName, res.data.dateOfBirth, res.data.gender, res.data.image);
                setMessage("Đăng nhập thành công!");
                setStatus(1);
                setEmail("");
                setPassword("");
                navigation.navigate("Home");
            }
        }
    };

    return (
        <SafeAreaView className="mx-5">
            <View className="mt-20">
                <Image source={require("../../../assets/logo.png")} className="m-auto" />
            </View>

            <View>
                <Text className="text-xl font-bold leading-snug">Đăng nhập</Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-8">
                    <Ionicons name="mail-outline" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" keyboardType="email-address" value={email} placeholder="abc@email.com" autoCapitalize="none" onChangeText={(v) => setEmail(v)} />
                </View>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-8">
                    <Ionicons name="lock-closed-outline" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" value={password} placeholder="Your password" onChangeText={(v) => setPassword(v)} secureTextEntry={true} />
                    <Ionicons name="eye-off" size={24} color="gray" />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                    <Text className="mt-5 text-right font-medium text-sm">Quên mật khẩu?</Text>
                </TouchableOpacity>

                <StatusBar />
            </View>

            <View className="w-2/3 m-auto mt-8">
                <TouchableOpacity className="bg-[#5669ff] rounded-xl h-14 justify-center" onPress={handleLogin}>
                    <Text className="text-center uppercase text-white font-bold items-center">Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row mt-10 justify-center">
                <Text className="font-normal text-sm">Bạn không có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text className="font-bold text-sm text-[#5669ff] italic">Đăng ký</Text>
                </TouchableOpacity>
            </View>

            <Spinner visible={loading} />
        </SafeAreaView>
    );
};

export default Login;
