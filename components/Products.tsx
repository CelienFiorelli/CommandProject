import React, { useEffect, useState, useContext } from "react";
import { Pressable, Text, StyleSheet, View, Button, Image, ScrollView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { server, getProducts, updateShoppingCart } from "../utils/api";
import Spinner from 'react-native-loading-spinner-overlay';
import { ctx } from "./UserContext";

interface ProductsParams {
    filter: 'menu' | 'boisson' | '*';
}

type Props = {
    route: RouteProp<Record<string, ProductsParams>, 'Products'>;
    navigation: DrawerNavigationProp<Record<string, ProductsParams>, 'Products'>;
};


function Products({ navigation, route }: Props) {
    const [products, setProducts]: [any[] | null, React.Dispatch<any>] = useState(null);
    const [loading, setLoading]: [boolean, React.Dispatch<any>] = useState(products == null);

    const [selectItem, setSelectItem] = useState(null);
    const {token, setToken} = useContext(ctx);

    useEffect(() => {
        (async () => {
            if (!route.params?.filter) return;
            const data = await getProducts(route.params?.filter);
            setProducts(data)
            setLoading(false)
        })();
    }, [])

    const order = (number: number) => {
        if (token){
            updateShoppingCart(token, selectItem._id, number);
            setSelectItem(null);
        }
        else navigation.navigate("Account")
    }

    return (
        <View style={{ backgroundColor: "#303030", height: "100%" }}>
            <View style={defaultStyle.header}>
                <View style={{ alignItems: "flex-start" }}>
                    <Pressable style={defaultStyle.button} onPress={() => navigation.openDrawer()}>
                        <AntDesign name="filter" size={24} />
                        <Text>Filtres</Text>
                    </Pressable>
                </View>
                <View style={{ justifyContent: "center"}}>
                    <Text style={{fontSize: 20}}>{ route.name }</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Pressable style={defaultStyle.button} onPress={() => navigation.navigate("Orders")}>
                        <MaterialIcons name="shopping-cart" size={24} />
                        <Text>Panier</Text>
                    </Pressable>
                </View>

            </View>
            <View style={{ position: "relative", display: "flex", flex: 1}}>
                <ScrollView>
                    {products && products.map(b =>
                    <Pressable key={b._id} onPress={() => setSelectItem(b.product)}>
                        <View style={defaultStyle.productContainer }>
                            {b.product.image && <Image style={{ width: 200, marginVertical: 8 }} source={{ uri: `${server}${b.product.image}` }} />}
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text>{b.product.name}</Text>
                                <Text>{b.product.price.$numberDecimal} €</Text>
                            </View>
                        </View>
                    </Pressable>
                    )}
                    <Spinner visible={loading} textContent={'Chargement...'} textStyle={{color: "white"}} />
                </ScrollView>
                {selectItem && <Pressable style={defaultStyle.popup} onPress={() => setSelectItem(null)}>
                    <Pressable>
                        <View style={[defaultStyle.defaultBorder, {backgroundColor: "#202020", padding: 8}]}>
                            {selectItem.image && <Image style={{ width: 200, height: 150 }} source={{ uri: `${server}${selectItem.image}` }} />}
                            <Text style={{textAlign: "center", marginVertical: 8}}>{selectItem.name}</Text>
                            <Text style={{textAlign: "center"}}>{selectItem.price.$numberDecimal} €</Text>
                        </View>
                        <View style={{marginTop: 16, display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <Pressable style={defaultStyle.button} onPress={() => { order(1) }}>
                                <Fontisto name="shopping-basket-add" size={24} />
                                <Text>Commander</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Pressable>}
            </View>
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        backgroundColor: "#202020",
    },
    button: {
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: "#009E27",
        alignItems: 'center',
    },
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
    defaultBorder: {
        borderRadius: 8,
        borderColor: "#009E27",
        borderWidth: 1,
    },
    popup: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000080",
    }
});

export default Products;