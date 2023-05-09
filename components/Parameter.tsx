import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ctx } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Parameter({ navigation }) {
    const { setToken} = useContext(ctx);

    const logout = async () => {
        setToken(null)
        await AsyncStorage.removeItem('token');
        return navigation.navigate("Account")
    }


    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={defaultStyle.header}>
                <View>
                    <Pressable style={defaultStyle.button} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24}/>
                    </Pressable>
                </View>
                <View>
                    <Text style={{fontSize: 20}}>Paramètres</Text>
                </View>
                <Pressable style={defaultStyle.button2} onPress={() => logout()}>
                    <AntDesign name="logout" size={24} />
                    <Text>Déconnexion</Text>
                </Pressable>
            </View>
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    button: {
        borderRadius: 100,
        paddingVertical: 2,
        paddingHorizontal: 2,
        backgroundColor: "#009E27",
        alignItems: 'center',
    },
    button2: {
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: "#009E27",
        alignItems: 'center',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#202020",
    },
})

export default Parameter;