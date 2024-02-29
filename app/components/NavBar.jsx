import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const NavBar = (props) => {
    const active = props.active;

    return (
        <View className="absolute bottom-0 left-0 right-0 bg-white ">
            <View className="flex-row justify-around py-2 items-center">
                <TouchableOpacity className="flex-1 items-center">
                    <Feather name="home" size={30} color={active === 1 ? "#386BF6" : "black"} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 items-center">
                    <Feather name="globe" size={30} color={active === 2 ? "#386BF6" : "black"} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 items-center">
                    <Feather name="plus-circle" size={40} color={active === 3 ? "#386BF6" : "black"} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 items-center">
                    <Feather name="layers" size={30} color={active === 4 ? "#386BF6" : "black"} />
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 items-center">
                    <Feather name="user" size={30} color={active === 5 ? "#386BF6" : "black"} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavBar;
