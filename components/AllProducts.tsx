import React, { useEffect, useState, useContext } from "react";
import { Pressable, Text, StyleSheet, View, Button, Image, ScrollView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { server, AllProductsAPIParams, getAllProducts, updateShoppingCart, getShoppingCartItems } from "../utils/api";
import Spinner from 'react-native-loading-spinner-overlay';
import { UserContext } from "./UserProvider";
import Toast from 'react-native-toast-message';
import globalStyle from "../styles/globalStyle";
import { ShoppingCartContext } from "./ShoppingCartProvider";

interface ProductsParams {
    filter: 'menu' | 'boisson';
}

type Props = {
    route: RouteProp<Record<string, ProductsParams>, 'AllProducts'>;
    navigation: DrawerNavigationProp<Record<string, ProductsParams>, 'AllProducts'>;
};


function AllProducts({ navigation, route }: Props) {
    const [products, setProducts]: [AllProductsAPIParams, React.Dispatch<any>] = useState(null);
    const [loading, setLoading]: [boolean, React.Dispatch<any>] = useState(products == null);

    const [selectItem, setSelectItem] = useState(null);
    const { token } = useContext(UserContext);
    const { shoppingCart, order } = useContext(ShoppingCartContext);
    
    useEffect(() => {
        (async () => {
            if (!route.params?.filter) return;
            const data = await getAllProducts();
            setProducts(data)
            setLoading(false)
        })();
    }, [])

    const updateShoppingCart = (number: number) => {
        if (token) {
            order(selectItem._id, number);
            setSelectItem(null);
            Toast.show({
                type: 'success',
                text1: 'Commande enregisté',
                text2: `${selectItem.name} a été ajouté au panier`
            });
            return;
        }
        return navigation.navigate("Account")
    }


    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={{ zIndex: 100, width: "100%", position: "absolute"}}>
                <Toast />
            </View>
            <View style={globalStyle.header}>
                <View style={{ alignItems: "flex-start" }}>
                    <Pressable style={globalStyle.buttonText} onPress={() => navigation.openDrawer()}>
                        <AntDesign name="filter" size={24} color={"white"} />
                        <Text style={{color: "white"}}>Filtres</Text>
                    </Pressable>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, color: "white" }}>{route.name}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    {token &&
                        <Pressable style={[globalStyle.buttonText, {position: "relative"}]} onPress={() => navigation.navigate("Orders")}>
                            {shoppingCart && shoppingCart.reduce((partialSum, p) => partialSum + p.quantity, 0) > 0 &&
                                <View style={{ position: "absolute", aspectRatio: 1/1, height: 20, right: -7, top: -7, borderRadius: 100, backgroundColor: "#FF0037", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Text style={{ fontSize: 14, color: "white"}}>
                                        {shoppingCart.reduce((partialSum, p) => partialSum + p.quantity, 0) > 9 ? "+9" : shoppingCart.reduce((partialSum, p) => partialSum + p.quantity, 0)}
                                    </Text>
                                </View>
                            }
                            <MaterialIcons name="shopping-cart" size={24} color={"white"} />
                            <Text style={{color: "white"}}>Panier</Text>
                        </Pressable>
                    }
                </View>
            </View>
            <View style={{ position: "relative", display: "flex", flex: 1 }}>
                <ScrollView>
                    {products && Object.entries(products).filter(t => t[1].length).map(t =>
                        <View key={t[0]} style={{ marginBottom: 16 }}>
                            <Text style={{ fontSize: 32, marginLeft: 16, color: "white" }}>{t[0]}</Text>
                            <ScrollView horizontal={true} style={[globalStyle.mainBorder, { backgroundColor: "#202020", marginHorizontal: 8 }]}>
                                {t[1].map(p =>
                                    <Pressable key={p._id} onPress={() => setSelectItem(p.product)}>
                                        <View style={{ flexDirection: "column", alignItems: "center", margin: 8, padding: 4 }}>
                                            {p.product.image && <Image style={{ width: 200, height: 150 }} source={{ uri: `${server}${p.product.image}` }} />}
                                            <Text style={{color: "white"}}>{p.product.name}</Text>
                                            <Text style={{color: "white"}}>{p.product.price.$numberDecimal} €</Text>
                                        </View>
                                    </Pressable>
                                )}
                            </ScrollView>
                        </View>
                    )}
                    <Spinner visible={loading} textContent={'Chargement...'} textStyle={{ color: "white" }} />
                </ScrollView>
                {selectItem && <Pressable style={defaultStyle.popup} onPress={() => setSelectItem(null)}>
                    <Pressable>
                        <View style={[globalStyle.mainBorder, { backgroundColor: "#202020", padding: 8 }]}>
                            {selectItem.image && <Image style={{ width: 200, height: 150 }} source={{ uri: `${server}${selectItem.image}` }} />}
                            <Text style={{ textAlign: "center", marginVertical: 8, color: "white" }}>{selectItem.name}</Text>
                            <Text style={{ textAlign: "center", color: "white" }}>{selectItem.price.$numberDecimal} €</Text>
                        </View>
                        <View style={{ marginTop: 16, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <Pressable style={globalStyle.buttonText} onPress={() => { updateShoppingCart(1) }}>
                                <Fontisto name="shopping-basket-add" size={24} color={"white"} />
                                <Text style={{color: "white"}}>Commander</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>}
            </View>
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    productContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 150,
        alignContent: "center",
        borderRadius: 8,
        borderColor: "#009E27",
        borderWidth: 1,
        margin: 8
    },
    popup: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000BB",
    }
});

export default AllProducts;