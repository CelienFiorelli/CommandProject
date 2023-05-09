import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Account from "./Account";
import ProductsFilter from "./ProductsFilter";
import { ctx } from "./UserContext";
import Profile from "./Profile";


function GlobalViewScreen() {
    const Tab = createBottomTabNavigator();

    const {token, setToken} = useContext(ctx);
    
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: '#009E27',
            tabBarInactiveBackgroundColor: "#202020",
            tabBarActiveBackgroundColor: "#202020",
            tabBarStyle: { borderTopColor: "#009E27", borderTopWidth: 1}
        }} sceneContainerStyle={{backgroundColor: "#303030"}}>
            <Tab.Screen name="Home" component={Home}
                options={{ tabBarLabel: 'Accueil', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />, headerShown: false }} />
            <Tab.Screen name="Products" component={ProductsFilter}
                options={{ tabBarLabel: 'Produits', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="food" color={color} size={size} />, headerShown: false }} />
            <Tab.Screen name="Account" component={token ? Profile : Account}
                options={{ tabBarLabel: 'Profil', tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />, headerShown: false }} />
        </Tab.Navigator>
    );
}

export default GlobalViewScreen;