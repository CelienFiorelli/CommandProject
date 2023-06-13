import React, { useContext, useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { UserContext } from "./UserProvider";
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
                        <Ionicons name="chevron-back" size={24} color={"white"} />
                    </Pressable>
                </View>
                <View>
                    <Text style={{fontSize: 20, color: "white"}}>Paramètres</Text>
                </View>
                <Pressable style={globalStyle.buttonText} onPress={() => {logout(); navigation.navigate("Account");}}>
                    <AntDesign name="logout" size={24} color={"white"} />
                    <Text style={{color: "white"}}>Déconnexion</Text>
                </Pressable>
            </View>
            {user &&
                <View>
                    <Text style={{ fontSize: 32, marginLeft: 16, color: "white" }}>Votre profil</Text>
                    <Text style={{color: "white"}}>Email : {user.email}</Text>
                    <Text style={{color: "white"}}>Prénom : {user.firstname}</Text>
                    <Text style={{color: "white"}}>Nom : {user.lastname}</Text>
                </View>
            }
        </View>
    );
}

export default Parameter;