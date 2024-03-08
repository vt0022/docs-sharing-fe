import { useEffect, useState } from "react";
import { privateAxios } from "./axios";
import { useQuery } from "@realm/react";
import { Profile } from "../../models/Profile";
import { useNavigation } from "@react-navigation/native";

const usePrivateAxios = () => {
    const navigation = useNavigation();

    const profileQuery = useQuery(Profile);

    const [profile, setProfile] = useState(profileQuery[0]);

    useEffect(() => {
        const requestInterceptor = privateAxios.interceptors.request.use(
            (config) => {
                if (!profile && !profile.accessToken) {
                    navigation.navigate("Login");
                } else {
                    config.headers.Authorization = `Bearer ${profile.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseInterceptor = privateAxios.interceptors.response.use(
            (response) => {
                if (response.data.status === 401 || response.data.status === 403) {
                    navigation.navigate("Login");
                }
                return response;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        return () => {
            privateAxios.interceptors.request.eject(requestInterceptor);
            privateAxios.interceptors.response.eject(responseInterceptor);
        };
    }, [profile]);
    return privateAxios;
};

export default usePrivateAxios;
