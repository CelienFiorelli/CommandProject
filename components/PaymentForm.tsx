import React, { useContext, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./UserProvider";
import globalStyle from "../styles/globalStyle";
import { TextInput } from "react-native-gesture-handler";
import { createPayment } from "../utils/api";
import { ShoppingCartContext } from "./ShoppingCartProvider";

function PaymentForm({ amount, setDisplay }) {
    const {token} = useContext(UserContext);
    const {remove} = useContext(ShoppingCartContext);

    const [formField, setFormField] = useState({
        card: null,
        expiration_card: null,
        crypto: null,
    });

    const submit = async () => {
        await createPayment(token, amount, formField.card, formField.expiration_card, formField.crypto);
        setDisplay(false)
        remove();
    }


    return (
        <View style={[globalStyle.mainBorder, { backgroundColor: "#202020", padding: 8, width: "80%" }]}>
            <Text style={{ fontSize: 18}}>Paiement de la commande</Text>
            <TextInput placeholder="Carte" style={[defaultStyle.textInput, {marginTop: 24}]} onChangeText={(text) => setFormField({...formField, card: text})} />
            <View style={{ display: "flex", flexDirection: "row"}}>
                <TextInput placeholder="Date d'expiration" style={[defaultStyle.textInput, {flex: 1, marginRight: 8 }]} onChangeText={(text) => setFormField({...formField, expiration_card: text})} />
                <TextInput placeholder="Crypto" style={[defaultStyle.textInput, {flex: 1}]} onChangeText={(text) => setFormField({...formField, crypto: text})} />
            </View>
            <View style={{ alignItems: "center"}}>
                <Pressable style={defaultStyle.button} onPress={() => submit()}>
                    <Text>Payer {amount} €</Text>
                </Pressable>
            </View>
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    textInput: {
        borderColor: "#009E27",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 24,
    },
    button: {
        borderRadius: 8,
        padding: 2,
        backgroundColor: "#009E27",
        alignItems: 'center',
        width: '50%',
        paddingVertical: 8,
    }
})

export default PaymentForm;