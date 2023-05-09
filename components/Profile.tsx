import React, { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { getUser } from "../utils/api";
import { ctx } from "./UserContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Profile({ navigation }) {
    const [user, setUser] = useState(null);

    const {token, setToken} = useContext(ctx);

    useEffect(() => {
        (async () => {
            const data = await getUser(token);
            setUser(data)
        })();
    }, [])

    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={defaultStyle.header}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={[defaultStyle.button, {marginRight: 16}]}>
                        <MaterialCommunityIcons name="account" size={24} />
                    </View>
                    <Text style={{fontSize: 20}}>{user ? `Bonjour ${user.firstname} ${user.lastname}` : ""}</Text>
                </View>
                <View>
                    <Pressable style={defaultStyle.button2} onPress={() => navigation.navigate("Parameter")}>
                        <Ionicons name="settings-sharp" size={24} />
                        <Text>Paramètre</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const defaultStyle = StyleSheet.create({
    settingButton: {
        borderRadius: 8,
        backgroundColor: "#009E27",
        alignItems: 'center',
        padding: 4
    },
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

export default Profile;