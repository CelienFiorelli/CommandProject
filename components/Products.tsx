import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, View, Button, Image, ScrollView } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { server, getProducts } from "../utils/api";
import Spinner from 'react-native-loading-spinner-overlay';

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

    useEffect(() => {
        (async () => {
            if (!route.params?.filter) return;
            const data = await getProducts(route.params?.filter);
            setProducts(data)
            setLoading(false)
        })();
    }, [])

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
            <ScrollView>
                {products && products.map(b =>
                    <View key={b._id} style={defaultStyle.productContainer }>
                        {b.image && <Image style={{ width: 200, marginVertical: 8 }} source={{ uri: `${server}${b.image}` }} />}
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text>{b.name}</Text>
                            <Text>{b.price.$numberDecimal} €</Text>
                        </View>
                    </View>
                )}
                <Spinner visible={loading} textContent={'Chargement...'} textStyle={{color: "white"}} />
            </ScrollView>
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
    }
});

export default Products;