import React, { useContext, useState } from "react";
import {
    Pressable,
    Text,
    TextInput,
    View,
    StyleSheet,
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { login, registerUser } from "../utils/api";
import { ctx } from "./UserContext";


function Account({ navigation }) {
    let isLogin = false;

    const {token, setToken} = useContext(ctx);

    const [register, setregister] = useState(false);
    const [formField, setFormField] = useState({
        email: null,
        password: null,
        lastname: null,
        firstname: null,
    });

    const sendLogin = async (action: String) => {
        if (action === "login") {
            const token = await login(formField.email, formField.password);
            setToken(token)
        } else {
            const token = await registerUser(formField.email, formField.password, formField.firstname, formField.lastname);
            setToken(token)
        }
    }

    return (
        <>
            <View style={{ alignItems: 'flex-end', margin: 12 }}>
                <Pressable style={defaultStyle.settingButton} onPress={() => navigation.navigate("Parameter")}>
                    <Ionicons name="settings-sharp" size={24} />
                </Pressable>
            </View>
            {!isLogin
            ? <>
                <View style={defaultStyle.container}>
                    <Text style={defaultStyle.title}>{register ? "S'inscrire" : "Se connecter"}</Text>
                    <View style={defaultStyle.formContainer}>
                        <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" autoComplete="email" style={defaultStyle.textInput} onChangeText={(text) => setFormField({...formField, email: text})} />
                        {register &&
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <TextInput placeholder="Prénom" style={[defaultStyle.textInput, { flex: 1, marginRight: 8 }]} onChangeText={(text) => setFormField({...formField, firstname: text})} />
                                <TextInput placeholder="Nom" style={[defaultStyle.textInput, { flex: 1, marginLeft: 8 }]} onChangeText={(text) => setFormField({...formField, lastname: text})} />
                            </View>
                        }
                        <TextInput placeholder="Mot de passe" autoCapitalize="none" secureTextEntry={true} style={defaultStyle.textInput} onChangeText={(text) => setFormField({...formField, password: text})}/>

                        <View style={{ alignItems: "center" }}>
                            <Pressable style={defaultStyle.button} onPress={() => sendLogin(register ? "register" : "login")}>
                                <Text>{register ? "Inscription" : "Connexion"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <Pressable style={{ alignItems: "center" }} onPress={() => setregister(!register)}>
                    <Text style={{ textDecorationLine: "underline" }}>
                        {register ? "J'ai déjà un compte" : "Créer un compte"}
                    </Text>
                </Pressable>
            </>
            : <View><Text>Déjà connecté</Text></View>}
        </>
    );

}

const defaultStyle = StyleSheet.create({
    container: {
        marginTop: 32,
        marginBottom: 16,
        paddingHorizontal: 32,
    },
    title: {
        fontWeight: "600",
        color: "white",
        fontSize: 18,
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: "#009E27",
    },
    formContainer: {
        paddingTop: 24,
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: "#009E27",
        borderWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    textInput: {
        borderColor: "#009E27",
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderBottomLeftRadius: 8,
        marginBottom: 24,
    },
    button: {
        borderRadius: 8,
        padding: 2,
        backgroundColor: "#009E27",
        alignItems: 'center',
        width: '50%',
        marginBottom: 24
    },
    settingButton: {
        borderRadius: 8,
        backgroundColor: "#009E27",
        alignItems: 'center',
        padding: 4
    }
})

export default Account;