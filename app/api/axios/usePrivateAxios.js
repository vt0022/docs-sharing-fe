import { useEffect, useState } from "react";
import { privateAxios } from "./axios";
import { useQuery } from "@realm/react";
import { Profile } from "../../models/Profile";
import { useNavigation } from "@react-navigation/native";

const usePrivateAxios = () => {
    const navigation = useNavigation();

    const profileQuery = useQuery(Profile);

    const [profile, setProfile] = useState(profileQuery[0] ? profileQuery[0] : null);

    useEffect(() => {
        const requestInterceptor = privateAxios.interceptors.request.use(
            (config) => {
                if (!profile && !profile.accessToken) {
                    navigation.navigate("Login");

                    //     // sessionStorage.setItem("entryMessage", "Phiên đăng nhập đã hết. Vui lòng đăng nhập lại!");
                } else {
                    //     // if (!user) {
                    //     //     if (currentPath.includes("/admin")) navigate("/admin/login");
                    //     //     else if (currentPath.includes("/manager")) navigate("/manager/login");
                    //     //     else navigate("/login");

                    //     //     sessionStorage.setItem("entryMessage", "Phiên đăng nhập đã hết. Vui lòng đăng nhập lại!");
                    //     // } else {
                    config.headers.Authorization = `Bearer ${profile.accessToken}`;
                    //     // sessionStorage.removeItem("entryMessage");
                    //     // }
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
                // if (response.data.status === 401) {
                //     sessionStorage.setItem("entryMessage", "Vui lòng đăng nhập trước!");
                // } else if (response.data.status === 403) {
                //     sessionStorage.setItem("entryMessage", "Tài khoản không có quyền truy cập!");
                // }
                // if (currentPath.includes("/admin")) navigate("/admin/login");
                // else if (currentPath.includes("/manager")) navigate("/manager/login");
                // if (user && user.role && user.role.roleName === "ROLE_STUDENT") navigate("/login");
                // if (user && user.role && user.role.roleName === "ROLE_ADMIN") navigate("/admin/login");
                // else if (user && user.role && user.role.roleName === "ROLE_MANAGER") navigate("/manager/login");
                // if (user && user.role && user.role.roleName === "ROLE_STUDENT") navigate("/login");
                // } else {
                //     sessionStorage.removeItem("entryMessage");
                // }
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
    }, []);
    return privateAxios;
};

export default usePrivateAxios;
