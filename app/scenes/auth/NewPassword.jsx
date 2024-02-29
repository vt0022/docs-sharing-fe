import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { resetPassword } from "../../api/rest/user";
import { isValidPassword } from "../../../utils/StringRegrex";
import Toast, { ErrorToast } from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const NewPassword = ({ route }) => {

    const navigation = useNavigation();
    const { email } = route.params;

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMessage("");
    }, [newPassword, confirmPassword]);

    useEffect(() => {
        message != "" ? showToast() : null;
    }, [message]);

    const showToast = () => {
        Toast.show({
            type: "error",
            text1: message,
        });
        setMessage("");
    };

    const handleResetPassword = async () => {
        if (newPassword === "") {
            setMessage("Vui lòng nhập mật khẩu mới!");
        } else if (!isValidPassword(newPassword)) {
            setMessage("Mật khẩu cần có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!");
        } else if (confirmPassword === "") {
            setMessage("Vui lòng xác nhận mật khẩu!");
        } else if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu không khớp!");
        } else {
            setLoading(true);

            const response = await resetPassword({
                email: email,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            });
            if (response.status === 200) {
                Toast.show({
                    type: "success",
                    text1: "Khôi phục mật khẩu thành công. Vui lòng đăng nhập lại!",
                });
                navigation.navigate("Login");
            }

            setLoading(false);
        }
    };

    return (
        <View className="mx-5 mt-5">
            <StatusBar />

            <TouchableOpacity className="mt-5 mb-5" onPress={() => navigation.navigate("OTP")}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View>
                <Text className="text-xl font-bold leading-snug">Cập nhật mật khẩu mới</Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-10">
                    <Ionicons name="lock-closed-outline" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" value={newPassword} placeholder="Your password" onChangeText={(v) => setNewPassword(v)} secureTextEntry={true} />
                    <Ionicons name="eye-off" size={24} color="gray" />
                </View>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-10">
                    <Ionicons name="lock-closed-outline" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" value={confirmPassword} placeholder="Confirm password" onChangeText={(v) => setConfirmPassword(v)} secureTextEntry={true} />
                    <Ionicons name="eye-off" size={24} color="gray" />
                </View>
            </View>

            <View className="w-2/3 m-auto mt-16 shadow-gray-600 shadow-lg">
                <TouchableOpacity className="bg-[#5669ff] rounded-xl h-14 justify-center shadow-2xl shadow-[#5669ff]" onPress={handleResetPassword}>
                    <Text className="text-center uppercase text-white font-bold items-center shadow-current shadow-lg">Cập nhật</Text>
                </TouchableOpacity>
            </View>

            <Spinner visible={loading} />
        </View>
    );
};

export default NewPassword;
