import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { signup } from "../../api/rest/auth";
import { isValidEmail, isValidPassword } from "../../../utils/StringRegrex";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";

const Signup = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMessage("");
    }, [firstName, lastName, email, password, confirmPassword]);

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

    const handleSignup = async () => {
        if (firstName === "") {
            setMessage("Vui lòng nhập tên!");
        } else if (lastName === "") {
            setMessage("Vui lòng nhập họ!");
        } else if (email === "") {
            setMessage("Vui lòng nhập email!");
        } else if (!isValidEmail(email)) {
            setMessage("Email không hợp lệ!");
        } else if (password === "") {
            setMessage("Vui lòng nhập mật khẩu!");
        } else if (!isValidPassword(password)) {
            setMessage("Mật khẩu cần có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!");
        } else if (password !== confirmPassword) {
            setMessage("Mật khẩu không khớp!");
        } else {
            setLoading(true);

            const response = await signup({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            });

            if (response.message === "Email already registered") {
                setMessage("Email đã được đăng ký!");
            } else if (response.message === "Passwords not match") {
                setMessage("Mật khẩu không khớp!");
            } else if (response.message === "Invalid password format") {
                setMessage("Mật khẩu cần có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!");
            } else if (response.status === 200) {
                Toast.show({
                    type: "success",
                    text1: "Đăng ký thành công! Vui lòng đăng nhập!",
                });
                navigation.navigate("Login");
            } else {
                setMessage("Đã có lỗi xảy ra! Vui lòng thử lại!");
            }
            
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="mx-5 mt-5">
            <StatusBar />

            <TouchableOpacity className="mt-5 mb-5" onPress={() => navigation.navigate("Login")}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View>
                <Text className="text-xl font-bold leading-snug">Đăng ký tài khoản</Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-8">
                    <AntDesign name="user" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" placeholder="First name" value={firstName} onChangeText={(v) => setFirstName(v)} />
                </View>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-4">
                    <AntDesign name="user" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" placeholder="Last name" value={lastName} onChangeText={(v) => setLastName(v)} />
                </View>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-4">
                    <Ionicons name="mail-outline" size={24} color="gray" />
                    <TextInput keyboardType="email-address" autoCapitalize="none" className="flex-grow h-12 ml-4" placeholder="abc@email.com" value={email} onChangeText={(v) => setEmail(v)} />
                </View>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-4">
                    <Ionicons name="lock-closed-outline" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" placeholder="Your password" value={password} onChangeText={(v) => setPassword(v)} secureTextEntry={true} />
                    <Ionicons name="eye-off" size={24} color="gray" />
                </View>

                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-4">
                    <Ionicons name="lock-closed-outline" size={24} color="gray" />
                    <TextInput className="flex-grow h-12 ml-4" placeholder="Confirm password" value={confirmPassword} onChangeText={(v) => setConfirmPassword(v)} secureTextEntry={true} />
                    <Ionicons name="eye-off" size={24} color="gray" />
                </View>
            </View>

            <View className="w-2/3 m-auto mt-8 shadow-gray-600 shadow-lg">
                <TouchableOpacity className="bg-[#5669ff] rounded-xl h-14 justify-center shadow-2xl shadow-[#5669ff]" onPress={handleSignup}>
                    <Text className="text-center uppercase text-white font-bold items-center shadow-current shadow-lg">Đăng ký</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row mt-10 justify-center">
                <Text className="font-normal text-sm">Bạn đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text className="font-bold text-sm text-[#5669ff] italic">Đăng nhập</Text>
                </TouchableOpacity>
            </View>

            <Spinner visible={loading} />
        </SafeAreaView>
    );
};

export default Signup;
