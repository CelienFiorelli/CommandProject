import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Products from "./Products";
import AllProducts from "./AllProducts";


function ProductsFilter() {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerInactiveTintColor: "white", drawerActiveTintColor: "#009E27", drawerStyle: {borderRightWidth: 1, borderRightColor: "#009E27", backgroundColor: "#303030"} }}>
            <Drawer.Screen name="Tous les produits" component={AllProducts} initialParams={{ filter: "*"}}
                options={{ drawerIcon: ({ color, size }) => <MaterialIcons name="restaurant-menu" color={color} size={size} /> }}/>

            <Drawer.Screen name="Menu" component={Products} initialParams={{ filter: "menus" }} 
                options={{ drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="food" color={color} size={size} /> }}/>

            <Drawer.Screen name="Burgers" component={Products} initialParams={{ filter: 'burgers'}}
                options={{ drawerIcon: ({ color, size }) => <FontAwesome5 name="hamburger" color={color} size={size} /> }}/>

            <Drawer.Screen name="Boissons" component={Products} initialParams={{ filter: 'drinks'}}
                options={{ drawerIcon: ({ color, size }) => <Entypo name="cup" color={color} size={size} /> }}/>
        </Drawer.Navigator>
    );
}

export default ProductsFilter;