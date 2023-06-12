import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { getOrders, getUsers, server, updateOrdersStatus, updateRole } from "../utils/api";
import { UserContext } from "./UserProvider";
import globalStyle from "../styles/globalStyle";
import { StyleSheet } from "react-native";
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Image } from "react-native";
import dateFormat from 'dateformat';

function RestorerOrder(props) {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        (async () => {
            setOrders(await getOrders(token));
        })();
    }, [])

    const calcPercent = (o: any) => {
        return Math.floor(100 / o.products.length * o.products.reduce((partialSum, p) => partialSum + (p.finish ? 1 : 0), 0))
    }

    const switchStatus = async (orderId: string, status: boolean) => {
        setOrders(await updateOrdersStatus(token, orderId, status));
    }

    return (
        <View style={{ position: "relative", display: "flex", flex: 1}}>
           <Text style={{color: "white"}}>Commande à préparer</Text>
           {orders && orders.map(o => 
            <View key={o._id} style={[globalStyle.mainBorder, {backgroundColor: "#202020", margin: 4}]}>
                <View style={[globalStyle.mainBorder, {backgroundColor: "#202020", padding: 8, margin: 8}]}>
                    <View style={{backgroundColor: "#202020", display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 8}}>
                        <Text style={{color: "white"}}>{o.username}</Text>
                        <Text style={{color: "white"}}>{dateFormat(o.creation_date, "dd/mm/yyyy H:MM:ss")}</Text>
                    </View>
                    <View style={{backgroundColor: "black", borderRadius: 6, position: "relative"}}>
                        <View style={{ width: 100, height: 12, position: "absolute", left: "50%", transform: [{translateX: -50}], zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{ fontSize: 12, height: 12, lineHeight: 13, zIndex: 20, color: "white"}}>{calcPercent(o) == 100 ? "Terminé" : `${calcPercent(o)}%` }</Text>
                        </View>
                        <View style={{ backgroundColor: "#009E27", width: `${calcPercent(o)}%`, height: 12, borderRadius: 6, display: "flex", alignItems: "center"}}></View>
                    </View>
                </View>
                <ScrollView horizontal={true}>
                    {o.products && o.products.map(p => 
                        <View key={p._id} style={[globalStyle.mainBorder, {width: 180, paddingTop: 4, margin: 4, display: "flex", alignItems: "center"}]}>
                            <View style={[defaultStyle[p.finish ? "finish": "todo"], defaultStyle.tag]}>
                                <Text style={{color: "white"}}>{p.finish ? "Terminé": "A faire"}</Text>
                            </View>
                            <Text style={{color: "white"}}>{p.product.name}</Text>
                            {p.product.image && <Image style={{ width: 200, height: 150 }} source={{ uri: `${server}${p.product.image}` }} />}
                            <View style={{backgroundColor: "black", borderTopColor: "#009E27", borderTopWidth: 1, borderBottomLeftRadius: 6, borderBottomRightRadius: 6, width: "100%", marginTop: 16, display: "flex", alignItems: "center", paddingVertical: 8}}>
                                <Pressable onPress={() => switchStatus(p._id, !p.finish)}>
                                    {p.finish ?
                                        <Fontisto name="checkbox-active" size={24} /> :
                                        <Fontisto name="checkbox-passive" size={24} />
                                    }
                                </Pressable>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
           )}
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    finish: {
        backgroundColor: "#006EFF",
        borderColor: "#0043FF",
    },
    todo: {
        backgroundColor: "#FF0008",
        borderColor: "#AA0008",
    },
    tag: {
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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

export default RestorerOrder;