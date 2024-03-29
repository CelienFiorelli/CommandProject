import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Account from "./Account";
import ProductsFilter from "./ProductsFilter";
import { UserContext } from "./UserProvider";
import Profile from "./Profile";
import Gestion from "./Gestion";
import RestorerOrder from "./RestorerOrder";


function GlobalViewScreen() {
    const Tab = createBottomTabNavigator();

    const { token, user } = useContext(UserContext);
    
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
            {user && user.role == "admin" && 
                <Tab.Screen name="Gestion" component={Gestion}
                    options={{ tabBarLabel: 'Gestion', tabBarIcon: ({ color, size }) => <MaterialIcons name="admin-panel-settings" color={color} size={size} />, headerShown: false }} />
            }
            {user && user.role == "restorer" && 
                <Tab.Screen name="Commandes" component={RestorerOrder}
                    options={{ tabBarLabel: 'Commandes', tabBarIcon: ({ color, size }) => <MaterialIcons name="admin-panel-settings" color={color} size={size} />, headerShown: false }} />
            }
        </Tab.Navigator>
    );
}

export default GlobalViewScreen;