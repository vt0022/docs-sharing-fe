import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { sendEmail } from "../../api/rest/auth";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";

const ForgetPassword = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMessage("");
    }, [email]);

    useEffect(() => {
        message !== "" ? showToast() : null;
    }, [message]);

    const showToast = () => {
        Toast.show({
            type: "error",
            text1: message,
        });
        setMessage("");
    };

    const handleSendEmail = async () => {
        if (email === "") {
            setMessage("Vui lòng nhập email!");
        } else {
            setLoading(true);

            const response = await sendEmail({
                params: {
                    email: email,
                },
            });

                        setLoading(false);

            if (response.message === "Email not registered") {
                setMessage("Email không tồn tại!");
            } else if (response.status === 200) {
                navigation.navigate("OTP", { email: email });
            } else {
                setMessage("Đã xảy ra lỗi! Vui lòng thử lại sau!");
            }
        }
    };

    return (
        <SafeAreaView className="mx-5 mt-5">
            <StatusBar />

            <TouchableOpacity className="mt-5 mb-5" onPress={() => navigation.navigate("Login")}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View>
                <Text className="text-xl font-bold leading-snug mt-10">Quên mật khẩu</Text>

                <Text className="font-normal text-sm mt-5">Vui lòng nhập vào email đăng ký tài khoản để đặt lại mật khẩu mới</Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-10">
                    <Ionicons name="mail-outline" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" value={email} onChangeText={(v) => setEmail(v)} placeholder="abc@email.com" keyboardType="email-address" autoCapitalize="none" />
                </View>
            </View>

            <View className="w-2/3 m-auto mt-20 shadow-gray-600 shadow-lg">
                <TouchableOpacity className="bg-[#5669ff] rounded-xl h-14 justify-center shadow-2xl shadow-[#5669ff]" onPress={handleSendEmail}>
                    <Text className="text-center uppercase text-white font-bold items-center shadow-current shadow-lg">Gửi OTP</Text>
                </TouchableOpacity>
            </View>

            <Spinner visible={loading} />
        </SafeAreaView>
    );
};

export default ForgetPassword;
