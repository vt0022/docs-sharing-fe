import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import userServices from '../../api/userServices'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { useDispatch } from 'react-redux'
import { addProfile, loginSuccess } from '../../redux/reducers/userSlice'
import * as yup from 'yup'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (values) => {
    setIsLoading(true)
    try {
      const resp = await userServices.login(values.email, values.password)
      setIsLoading(false)
      if (resp.status === 200) {
        dispatch(loginSuccess(resp.data))
        await AsyncStorage.setItem('auth', JSON.stringify(resp.data))
        const profileResp = await userServices.getProfile(resp.data.accessToken)
        dispatch(addProfile(profileResp))

        Toast.show({
          type: 'success',
          text1: resp.message,
        })
        navigation.navigate('MainNavigator')
      } else {
        Toast.show({
          type: 'error',
          text1: resp.message,
        })
      }
    } catch (error) {
      setIsLoading(false)
      Toast.show({
        type: 'error',
        text1: error,
      })
    }
  }

  //Form checking
  const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Please enter valid email').required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

  return (
    <SafeAreaView className="mx-5">
      <View className="mt-20">
        <Image source={require('../../../assets/logo.png')} className="m-auto" />
      </View>
      <Text className="text-xl font-bold leading-snug">Đăng nhập</Text>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <View>
              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-8">
                <Ionicons name="mail-outline" size={24} color="gray" />
                <TextInput
                  className="flex-grow h-12 ml-4"
                  keyboardType="email-address"
                  value={values.email}
                  placeholder="abc@email.com"
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                />
              </View>
              {errors.email && <Text className="text-red-500 text-sm">{errors.email}</Text>}

              <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-8">
                <Ionicons name="lock-closed-outline" size={24} color="gray" />
                <TextInput
                  className="flex-grow h-12 ml-4"
                  value={values.password}
                  placeholder="Your password"
                  onChangeText={handleChange('password')}
                  secureTextEntry={true}
                />
                <Ionicons name="eye-off" size={24} color="gray" />
              </View>
              {errors.password && <Text className="text-red-500 text-sm">{errors.password}</Text>}
              <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                <Text className="mt-5 text-right font-medium text-sm">Quên mật khẩu?</Text>
              </TouchableOpacity>

              <StatusBar />
            </View>
            <View className="w-2/3 m-auto mt-8">
              <TouchableOpacity className="bg-[#5669ff] rounded-xl h-14 justify-center" onPress={handleSubmit}>
                <View className="flex-row items-center justify-center gap-2">
                  <Text className="text-center uppercase text-white font-bold items-center">Đăng nhập</Text>
                  <AntDesign name="arrowright" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>

      <View className="flex-row mt-10 justify-center">
        <Text className="font-normal text-sm">Bạn không có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text className="font-bold text-sm text-[#5669ff] italic">Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <Spinner visible={isLoading} />
    </SafeAreaView>
  )
}

export default Login

// const Login = () => {
//   const realm = useRealm();

//   const navigation = useNavigation();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [status, setStatus] = useState(0);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setMessage("");
//     setStatus(0);
//   }, [email, password]);

//   useEffect(() => {
//     status !== 0 && message !== "" ? showToast() : null;
//   }, [status, message]);

//   const addProfile = (password, email, accessToken, refreshToken) => {
//     realm.write(() => {
//       realm.create(Profile, {
//         _id: new BSON.ObjectId(),
//         password: password,
//         email: email,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
//       });
//     });
//   };

//   const profile = useQuery(Profile);

//   const updateProfile = (firstName, lastName, dateOfBirth, gender, image) => {
//     realm.write(() => {
//       profile[0].firstName = firstName;
//       profile[0].lastName = lastName;
//       profile[0].dateOfBirth = dateOfBirth;
//       profile[0].gender = gender;
//       profile[0].image = image;
//     });
//   };

//   const showToast = () => {
//     Toast.show({
//       type: status === -1 ? "error" : "success",
//       text1: message,
//     });
//     setMessage("");
//     setStatus(1);
//   };

//   const handleLogin = async () => {
//     setLoading(true);

//     const response = await login({
//       email: email,
//       password: password,
//     });

//     setLoading(false);

//     if (response.message === "Email not registered") {
//       setMessage("Email chưa đăng ký!");
//       setStatus(-1);
//     } else if (response.message === "Wrong password") {
//       setMessage("Mật khẩu không đúng!");
//       setStatus(-1);
//     } else if (response.message === "Account disabled") {
//       setMessage("Tài khoản đã bị đình chỉ!");
//       setStatus(-1);
//     } else if (response.message === "Account needs activated") {
//       setMessage("Tài khoản của bạn cần được kích hoạt!");
//       setStatus(-1);

//       const response = await sendEmail({
//         params: {
//           email: email,
//           type: "register",
//         },
//       });

//       if (response.status === 200)
//         navigation.navigate("OTP", { email: email, type: "register" });
//       else {
//         setMessage("Đã có lỗi xảy ra khi gửi mã OTP!");
//         setStatus(-1);
//       }
//     } else if (response.status === 400) {
//       setMessage("Có lỗi xảy ra! Vui lòng thử lại sau!");
//       setStatus(-1);
//     } else {
//       addProfile(
//         "********",
//         email,
//         response.data.accessToken,
//         response.data.refreshToken
//       );

//       const config = {
//         headers: { Authorization: `Bearer ${response.data.accessToken}` },
//       };

//       const res = await getProfile(config);

//       if (res.status === 200) {
//         updateProfile(
//           res.data.firstName,
//           res.data.lastName,
//           res.data.dateOfBirth,
//           res.data.gender,
//           res.data.image
//         );
//         setMessage("Đăng nhập thành công!");
//         setStatus(1);
//         setEmail("");
//         setPassword("");
//         navigation.navigate("Home");
//       }
//     }
//   };

//   return (
//     <SafeAreaView className="mx-5">
//       <View className="mt-20">
//         <Image
//           source={require("../../../assets/logo.png")}
//           className="m-auto"
//         />
//       </View>

//       <View>
//         <Text className="text-xl font-bold leading-snug">Đăng nhập</Text>

//         <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-8">
//           <Ionicons name="mail-outline" size={24} color="gray" />
//           <TextInput
//             className="flex-grow h-12 ml-4"
//             keyboardType="email-address"
//             value={email}
//             placeholder="abc@email.com"
//             autoCapitalize="none"
//             onChangeText={(v) => setEmail(v)}
//           />
//         </View>

//         <View className="flex-row items-center border border-gray-200 rounded-xl px-4 mt-8">
//           <Ionicons name="lock-closed-outline" size={24} color="gray" />
//           <TextInput
//             className="flex-grow h-12 ml-4"
//             value={password}
//             placeholder="Your password"
//             onChangeText={(v) => setPassword(v)}
//             secureTextEntry={true}
//           />
//           <Ionicons name="eye-off" size={24} color="gray" />
//         </View>

//         <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
//           <Text className="mt-5 text-right font-medium text-sm">
//             Quên mật khẩu?
//           </Text>
//         </TouchableOpacity>

//         <StatusBar />
//       </View>

//       <View className="w-2/3 m-auto mt-8">
//         <TouchableOpacity
//           className="bg-[#5669ff] rounded-xl h-14 justify-center"
//           onPress={handleLogin}
//         >
//           <Text className="text-center uppercase text-white font-bold items-center">
//             Đăng nhập
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View className="flex-row mt-10 justify-center">
//         <Text className="font-normal text-sm">Bạn không có tài khoản? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
//           <Text className="font-bold text-sm text-[#5669ff] italic">
//             Đăng ký
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <Spinner visible={loading} />
//     </SafeAreaView>
//   );
// };

// export default Login;
