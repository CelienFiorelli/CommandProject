import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, View, Button, Image, ScrollView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { server, AllProductsAPIParams, getAllProducts } from "../utils/api";
import Spinner from 'react-native-loading-spinner-overlay';

interface ProductsParams {
    filter: 'menu' | 'boisson' | '*';
}

type Props = {
    route: RouteProp<Record<string, ProductsParams>, 'AllProducts'>;
    navigation: DrawerNavigationProp<Record<string, ProductsParams>, 'AllProducts'>;
};


function AllProducts({ navigation, route }: Props) {
    const [products, setProducts]: [AllProductsAPIParams, React.Dispatch<any>] = useState(null);
    const [loading, setLoading]: [boolean, React.Dispatch<any>] = useState(products == null);

    const [selectItem, setSelectItem] = useState(null);

    useEffect(() => {
        (async () => {
            if (!route.params?.filter) return;
            const data = await getAllProducts();
            setProducts(data)
            setLoading(false)
        })();
    }, [])

    const displayDetails = (item) => {
        setSelectItem(item)
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
            <View style={{ position: "relative"}}>
                <ScrollView>
                    {products && Object.entries(products).filter(t => t[1].length).map(t =>
                        <View key={t[0]} style={{marginBottom: 16}}>
                            <Text style={{fontSize: 32, marginLeft: 16}}>{t[0]}</Text>
                            <ScrollView horizontal={true} style={[defaultStyle.defaultBorder, {backgroundColor: "#202020", marginHorizontal: 8}]}>
                                {t[1].map(p =>
                                <Pressable key={p._id} onPress={() => displayDetails(p)}>
                                    <View style={{flexDirection: "column", alignItems: "center", margin: 8, padding: 4, borderColor: "#00000064", borderWidth: 1}}>
                                        {p.image && <Image style={{ width: 200, height: 150 }} source={{ uri: `${server}${p.image}` }} />}
                                        <Text>{p.name}</Text>
                                        <Text>{p.price.$numberDecimal} €</Text>
                                    </View>
                                </Pressable>
                                )}
                            </ScrollView>
                        </View>
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
                            <Pressable style={defaultStyle.button}>
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

export default AllProducts;