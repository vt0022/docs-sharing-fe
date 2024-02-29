import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { sendEmail, verify } from "../../api/rest/auth";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";

const OTP = ({ route }) => {
    const navigation = useNavigation();

    const inputNo1Ref = useRef();
    const inputNo2Ref = useRef();
    const inputNo3Ref = useRef();
    const inputNo4Ref = useRef();
    const inputNo5Ref = useRef();
    const inputNo6Ref = useRef();

    const initialSeconds = 15 * 60 - 5; // 15 phút

    const { email } = route.params;

    const [countdown, setCountdown] = useState(initialSeconds);
    const [no1, setNo1] = useState("");
    const [no2, setNo2] = useState("");
    const [no3, setNo3] = useState("");
    const [no4, setNo4] = useState("");
    const [no5, setNo5] = useState("");
    const [no6, setNo6] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Tính toán phút và giây
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    useEffect(() => {
        const interval = setInterval(() => {
            if (countdown > 0) {
                setCountdown((prevCountdown) => prevCountdown - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setMessage("");
    }, [no1, no2, no3, no4, no5, no6]);

    useEffect(() => {
        if (no6.length === 1) {
            verifyOTP();
        }
    }, [no6]);

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

    const handleResendOTP = async () => {
        setLoading(true);

        const response = await sendEmail({
            params: {
                email: email,
            },
        });

        setLoading(false);

        if (response.status === 200) setCountdown(initialSeconds);

        Toast.show({
            type: response.status === 200 ? "success" : "error",
            text1: response.status === 200 ? "Đã gửi lại OTP!" : "Đã xảy ra lỗi! Vui lòng thử lại sau!",
        });
    };

    const verifyOTP = async () => {
        const code = no1.toString() + no2.toString() + no3.toString() + no4.toString() + no5.toString() + no6.toString();

        if (code.length < 6) {
            setMessage("Vui lòng nhập đủ 6 ký tự!");
            return;
        }

        setLoading(true);

        const response = await verify({
            params: {
                email: email,
                code: code,
            },
        });

        setLoading(false);

        if (response.message === "User not found") {
            setMessage("Email không tồn tại!");
        } else if (response.message === "Wrong verification code") {
            setMessage("Mã OTP không đúng!");
        } else if (response.message === "Verification code is expired") {
            setMessage("Mã OTP đã hết hạn!");
        } else if (response.status === 200) {
            navigation.navigate("NewPassword", { email: email });
        } else {
            setMessage("Đã xảy ra lỗi! Vui lòng thử lại sau!");
        }
    };

    return (
        <View className="mx-5 mt-5">
            <StatusBar />

            <TouchableOpacity className="mt-5 mb-5" onPress={() => navigation.navigate("ForgetPassword")}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View>
                <Text className="text-xl font-bold leading-snug mt-10">Xác thực bằng mã OTP</Text>

                <Text className="font-normal text-sm mt-5">Chúng tôi đã gửi mã xác thực qua email của bạn, vui lòng kiểm tra email và nhập đúng mã OTP </Text>

                <View className="flex flex-row justify-around mt-10 space-x-2">
                    <TextInput
                        ref={inputNo1Ref}
                        keyboardType="numeric"
                        className="flex-1 h-14 border border-gray-200 rounded-xl text-center font-bold text-xl text-black"
                        value={no1}
                        onChangeText={(v) => {
                            setNo1(v);
                            if (v.length === 1) {
                                inputNo2Ref.current.focus();
                            }
                        }}
                        placeholder="_"
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputNo2Ref}
                        keyboardType="numeric"
                        className="flex-1 h-14 border border-gray-200 rounded-xl text-center font-bold text-xl text-black"
                        value={no2}
                        onChangeText={(v) => {
                            setNo2(v);
                            if (v.length === 1) {
                                inputNo3Ref.current.focus();
                            }
                            if (v.length === 0) {
                                inputNo1Ref.current.focus();
                            }
                        }}
                        placeholder="_"
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputNo3Ref}
                        keyboardType="numeric"
                        className="flex-1 h-14 border border-gray-200 rounded-xl text-center font-bold text-xl text-black"
                        value={no3}
                        onChangeText={(v) => {
                            setNo3(v);
                            if (v.length === 1) {
                                inputNo4Ref.current.focus();
                            }
                            if (v.length === 0) {
                                inputNo2Ref.current.focus();
                            }
                        }}
                        placeholder="_"
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputNo4Ref}
                        keyboardType="numeric"
                        className="flex-1 h-14 border border-gray-200 rounded-xl text-center font-bold text-xl text-black"
                        value={no4}
                        onChangeText={(v) => {
                            setNo4(v);
                            if (v.length === 1) {
                                inputNo5Ref.current.focus();
                            }
                            if (v.length === 0) {
                                inputNo3Ref.current.focus();
                            }
                        }}
                        placeholder="_"
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputNo5Ref}
                        keyboardType="numeric"
                        className="flex-1 h-14 border border-gray-200 rounded-xl text-center font-bold text-xl text-black"
                        value={no5}
                        onChangeText={(v) => {
                            setNo5(v);
                            if (v.length === 1) {
                                inputNo6Ref.current.focus();
                            }
                            if (v.length === 0) {
                                inputNo4Ref.current.focus();
                            }
                        }}
                        placeholder="_"
                        maxLength={1}
                    />
                    <TextInput
                        ref={inputNo6Ref}
                        keyboardType="numeric"
                        className="flex-1 h-14 border border-gray-200 rounded-xl text-center font-bold text-xl text-black"
                        value={no6}
                        onChangeText={(v) => {
                            setNo6(v);
                            if (v.length === 1 && no6.length === 1) {
                                verifyOTP();
                            }
                            if (v.length === 0) {
                                inputNo5Ref.current.focus();
                            }
                        }}
                        placeholder="_"
                        maxLength={1}
                    />
                </View>
            </View>

            <View className="flex flex-row mt-10 justify-center space-x-5">
                {countdown > 0 && <Text>{`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`}</Text>}
                <TouchableOpacity onPress={handleResendOTP}>
                    <Text className="font-bold text-[#5669ff]">Gửi lại</Text>
                </TouchableOpacity>
            </View>

            <View className="w-2/3 m-auto mt-20 shadow-gray-600 shadow-lg">
                <TouchableOpacity className="bg-[#5669ff] rounded-xl h-14 justify-center shadow-2xl shadow-[#5669ff]" onPress={verifyOTP}>
                    <Text className="text-center uppercase text-white font-bold items-center shadow-current shadow-lg">Xác nhận</Text>
                </TouchableOpacity>
            </View>

            <Spinner visible={loading} />
        </View>
    );
};

export default OTP;
