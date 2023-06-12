import React, { useContext, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getUser } from "../utils/api";
import globalStyle from "../styles/globalStyle";

function Parameter({ navigation }) {
    const {token, logout} = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getUser(token);
            setUser(data)
        })();
    }, [])

    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={globalStyle.header}>
                <View>
                    <Pressable style={globalStyle.buttonIcon} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24}/>
                    </Pressable>
                </View>
                <View>
                    <Text style={{fontSize: 20}}>Paramètres</Text>
                </View>
                <Pressable style={globalStyle.buttonText} onPress={() => {logout(); navigation.navigate("Account");}}>
                    <AntDesign name="logout" size={24} />
                    <Text>Déconnexion</Text>
                </Pressable>
            </View>
            {user &&
                <View>
                    <Text style={{ fontSize: 32, marginLeft: 16 }}>Votre profil</Text>
                    <Text>Email : {user.email}</Text>
                    <Text>Prénom : {user.firstname}</Text>
                    <Text>Nom : {user.lastname}</Text>
                </View>
            }
        </View>
    );
}

export default Parameter;