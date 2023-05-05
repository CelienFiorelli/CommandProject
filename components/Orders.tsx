import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getShoppingCartItems, updateShoppingCart } from "../utils/api";
import { ctx } from "./UserContext";
import { ScrollView } from "react-native-gesture-handler";
import { server } from "../utils/api";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from "react-native-loading-spinner-overlay/lib";

function Orders(props) {
    const {token, setToken} = useContext(ctx);
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
            editProducts[products.indexOf(products.find(p => p.product._id == productId))].quantity += number;
            return editProducts;
        });
        
        await updateShoppingCart(token, productId, number);
    }

    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <ScrollView>
                {products && products.map(p =>
                    <View key={p._id} style={defaultStyle.productContainer }>
                        {p.product.image && <Image style={{ width: 200, marginVertical: 8 }} source={{ uri: `${server}${p.product.image}` }} />}
                        <View style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", marginVertical: 32 }}>
                            <Text>{p.product.name}</Text>
                            <Text>{p.product.price.$numberDecimal * p.quantity} €</Text>
                            <View style={[{ flexDirection: "row", alignItems: "center"}, defaultStyle.defaultBorder]}>
                                <Pressable style={p.quantity <= 1 ? defaultStyle.buttonDisabled : defaultStyle.button} disabled={p.quantity <= 1} onPress={() => order(p.product._id, -1)}>
                                    <Ionicons name="remove" size={24} />
                                </Pressable>
                                <Text style={{ marginHorizontal: 24 }}>{p.quantity}</Text>
                                <Pressable style={defaultStyle.button} onPress={() => order(p.product._id, 1)}>
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
        borderWidth: 1,
        margin: 8
    },
    button: {
        borderRadius: 100,
        paddingVertical: 2,
        paddingHorizontal: 2,
        backgroundColor: "#009E27",
        alignItems: 'center',
    },
    buttonDisabled: {
        borderRadius: 100,
        paddingVertical: 2,
        paddingHorizontal: 2,
        backgroundColor: "#303030",
        alignItems: 'center',
    },
    defaultBorder: {
        borderRadius: 100,
        borderColor: "#009E27",
        borderWidth: 1,
    },
});

export default Orders;