import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { UserContext } from "./UserProvider";
import { getUserOrders } from "../utils/api";
import { ScrollView } from "react-native-gesture-handler";
import globalStyle from "../styles/globalStyle";
import dateFormat from "dateformat";

function Home(props) {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!token) return
        (async () => {
            setOrders(await getUserOrders(token));
        })();
    }, [token]);

    const calcPercent = (o: any) => {
        return Math.floor(100 / o.products.length * o.products.reduce((partialSum, p) => partialSum + (p.finish ? 1 : 0), 0))
    }

    const productGroupBy = (products: any): Object => {
        const data = {}
        for (const order of products) {
            if (Object.keys(data).includes(order.product._id)) {
                data[order.product._id].quantity += 1
            } else {
                data[order.product._id] = {name: order.product.name, finish: order.finish, quantity: 1 }
            }
        }
        return data
    }

    return (
        <View>
            <Text>Accueil</Text>
            <View>
                {token && orders.length > 0 &&
                    <View style={{ marginTop: 24}}>
                        <Text style={{ fontSize: 24, marginLeft: 8}}>Etat de {orders.length == 1 ? "votre commande" : "vos commandes"}</Text>
                        {orders.map(o =>
                            <View key={o._id} style={[globalStyle.mainBorder, { backgroundColor: "#202020", margin: 4, padding: 8 }]}>
                                <View style={{ backgroundColor: "#202020", marginBottom: 8 }}>
                                    <Text>Votre commande du {dateFormat(o.creation_date, "dd/mm/yyyy à H:MM")}</Text>
                                </View>
                                <View style={{ backgroundColor: "black", borderRadius: 6, position: "relative" }}>
                                    <View style={{ width: 100, height: 12, position: "absolute", left: "50%", transform: [{ translateX: -50 }], zIndex: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 12, height: 12, lineHeight: 13, zIndex: 20 }}>{calcPercent(o) == 100 ? "Terminé" : `${calcPercent(o)}%`}</Text>
                                    </View>
                                    <View style={{ backgroundColor: "#009E27", width: `${calcPercent(o)}%`, height: 12, borderRadius: 6, display: "flex", alignItems: "center" }}></View>
                                </View>
                                <View style={{borderTopColor: "#009E27", borderTopWidth: 1, marginTop: 12, paddingTop: 8}}>
                                    {Object.entries(productGroupBy(o.products)).map(p => 
                                        <View key={p[0]}>
                                            <Text> - {p[1].name}    x{p[1].quantity}</Text>
                                        </View>    
                                    )}
                                </View>
                            </View>
                        )}
                    </View>}
            </View>
        </View>
    );
}

export default Home;