import React, { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { getUser } from "../utils/api";
import { UserContext } from "./UserProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyle from "../styles/globalStyle";

function Profile({ navigation }) {
    const [user, setUser] = useState(null);

    const {token} = useContext(UserContext);

    useEffect(() => {
        (async () => {
            const data = await getUser(token);
            setUser(data)
        })();
    }, [])

    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={globalStyle.header}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={[globalStyle.buttonIcon, {marginRight: 16}]}>
                        <MaterialCommunityIcons name="account" size={24} />
                    </View>
                    <Text style={{fontSize: 20}}>{user && `${user.firstname} ${user.lastname}`}</Text>
                </View>
                <View>
                    <Pressable style={globalStyle.buttonText} onPress={() => navigation.navigate("Parameter")}>
                        <Ionicons name="settings-sharp" size={24} />
                        <Text>Paramètre</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Profile;