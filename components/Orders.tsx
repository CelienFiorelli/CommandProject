import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getShoppingCartItems, updateShoppingCart } from "../utils/api";
import { UserContext } from "./UserProvider";
import { ScrollView } from "react-native-gesture-handler";
import { server } from "../utils/api";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-loading-spinner-overlay/lib";
import globalStyle from "../styles/globalStyle";

function Orders({ navigation, route }) {
    const {token} = useContext(UserContext);
    const [products, setProducts] = useState(null);
    const [loading, setLoading]: [boolean, React.Dispatch<any>] = useState(products == null);

    useEffect(() => {
        (async () => {
            const data = await getShoppingCartItems(token);
            setProducts(data);
            setLoading(false)
        })();
    }, [])

    const order = async (productId: string, number: number) => {
        setProducts((products) => {
            const editProducts = [...products];
            const productIndex = products.indexOf(products.find(p => p.product._id == productId));
            if (editProducts[productIndex].quantity + number <= 0) {
                editProducts.splice(productIndex, 1)
            } else {
                editProducts[productIndex].quantity += number;
            }
            return editProducts;
        });
        
        await updateShoppingCart(token, productId, number);
    }

    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={globalStyle.header}>
                <View>
                    <Pressable style={globalStyle.buttonIcon} onPress={() => { navigation.goBack(); }}>
                        <Ionicons name="chevron-back" size={24}/>
                    </Pressable>
                </View>
                <View>
                    <Text style={{fontSize: 20}}>Votre commande</Text>
                </View>
                <View>
                    <Pressable style={globalStyle.buttonText}>
                        <Ionicons name="card-outline" size={24} />
                        <Text>{products && products.reduce((partialSum, p) => partialSum + p.product.price.$numberDecimal * p.quantity, 0).toFixed(2)} €</Text>
                    </Pressable>
                </View>
            </View>
            <ScrollView>
                {products && products.map(p =>
                    <View key={p.product._id} style={defaultStyle.productContainer}>
                        <Pressable style={defaultStyle.deleteButton} onPress={() => order(p.product._id, -p.quantity)}>
                            <Ionicons name="trash-outline" size={24} />
                        </Pressable>
                        {p.product.image && <Image style={{ width: 200, marginVertical: 8 }} source={{ uri: `${server}${p.product.image}` }} />}
                        <View style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", marginVertical: 32 }}>
                            <Text>{p.product.name}</Text>
                            <Text>{(p.product.price.$numberDecimal * p.quantity).toFixed(2)} €</Text>
                            <View style={[globalStyle.mainBorder, { flexDirection: "row", alignItems: "center", borderRadius: 100}]}>
                                <Pressable style={p.quantity <= 1 ? defaultStyle.buttonDisabled : globalStyle.buttonIcon} disabled={p.quantity <= 1} onPress={() => order(p.product._id, -1)}>
                                    <Ionicons name="remove" size={24} />
                                </Pressable>
                                <Text style={{ marginHorizontal: 24 }}>{p.quantity}</Text>
                                <Pressable style={globalStyle.buttonIcon} onPress={() => order(p.product._id, 1)}>
                                    <Ionicons name="add" size={24} />
                                </Pressable>
                            </View>
                        </View>
                </View>
                )}
            </ScrollView>
            <Spinner visible={loading} textContent={'Chargement...'} textStyle={{color: "white"}} />
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    productContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#202020",
        height: 150,
        alignContent: "center",
        borderRadius: 8,
        borderColor: "#009E27",
        position: "relative",
        borderWidth: 1,
        margin: 8
    },
    deleteButton: {
        borderRadius: 100,
        paddingVertical: 2,
        paddingHorizontal: 2,
        backgroundColor: "#FF0037",
        position: "absolute",
        top: 4,
        right: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonDisabled: {
        borderRadius: 100,
        paddingVertical: 2,
        paddingHorizontal: 2,
        backgroundColor: "#303030",
        alignItems: 'center',
    },
});

export default Orders;