import React, { useContext, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./UserProvider";
import globalStyle from "../styles/globalStyle";
import { TextInput } from "react-native-gesture-handler";
import { createPayment } from "../utils/api";
import { ShoppingCartContext } from "./ShoppingCartProvider";
import { useNavigation } from "@react-navigation/native";

function PaymentForm({ amount, setDisplay }) {
    const {token, user} = useContext(UserContext);
    const {remove} = useContext(ShoppingCartContext);
    const [price, setPrice] = useState(amount)

    const [formField, setFormField] = useState({
        card: null,
        expiration_card: null,
        crypto: null,
        fidelity: "0",
    });

    const submit = async () => {
        if (!token || Object.values(formField).filter(v => v == null).length) return
        
        await createPayment(token, formField.fidelity, formField.card, formField.expiration_card, formField.crypto);
        setDisplay(false)
        remove();
    }

    const setFidelityAmount = (point: string) => {
        if (parseInt(point) <= 0) return setFormField({...formField, fidelity: null});
        const maxFidelity = Math.ceil(amount * 7);
        
        setFormField({...formField, fidelity: point})
        let pointUse = point
        if (parseInt(point) > user.fidelity) {
            setFormField({...formField, fidelity: user.fidelity.toFixed(0)})
            pointUse = user.fidelity
        }
        if (parseInt(point) > maxFidelity) {
            setFormField({...formField, fidelity: maxFidelity.toFixed(0)})
            pointUse = maxFidelity.toString();
        }
        
        if (!parseInt(pointUse)) return setPrice(amount);
        if (parseInt(pointUse) == maxFidelity) return setPrice(0);
        setPrice((amount - parseInt(pointUse) / 7).toFixed(2));
    }


    return (
        <>
            <View style={[globalStyle.mainBorder, { backgroundColor: "#202020", padding: 8, width: "70%", marginBottom: 24 }]}>
                <Text style={{color: "white"}}>Vous avez {user.fidelity} points de fidélité</Text>
                <TextInput placeholder="Nombre de points à utiliser" keyboardType="numeric" style={[defaultStyle.textInput, {marginTop: 24}]} value={formField.fidelity} onChangeText={(text) => setFidelityAmount(text)} />
            </View>

            <View style={[globalStyle.mainBorder, { backgroundColor: "#202020", padding: 8, width: "80%" }]}>
                <Text style={{ fontSize: 18, color: "white" }}>Paiement de la commande</Text>
                <TextInput placeholder="Carte" keyboardType="numeric" style={[defaultStyle.textInput, {marginTop: 24}]} maxLength={13} onChangeText={(text) => setFormField({...formField, card: text})} />
                <View style={{ display: "flex", flexDirection: "row"}}>
                    <TextInput placeholder="Date d'expiration" style={[defaultStyle.textInput, {flex: 1, marginRight: 8 }]} maxLength={5} onChangeText={(text) => setFormField({...formField, expiration_card: text})} />
                    <TextInput placeholder="Crypto" keyboardType="numeric" style={[defaultStyle.textInput, {flex: 1}]} maxLength={3} onChangeText={(text) => setFormField({...formField, crypto: text})} />
                </View>
                <View style={{ alignItems: "center"}}>
                    <Pressable style={defaultStyle.button} onPress={() => submit()}>
                        <Text style={{color: "white"}}>Payer {price} €</Text>
                    </Pressable>
                </View>
            </View>
        </>
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