import { useState, createContext, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getShoppingCartItems, login as loginUser, registerUser, updateShoppingCart } from "../utils/api";
import { UserContext } from "./UserProvider";

interface ShoppingCartContextInterface {
    token: string | null;
    login: (email: string, password: string) => Promise<string>;
    logout: () => void;
    register: (email: string, password: string, firstname: string, lastname: string) => Promise<string>;
}

export const ShoppingCartContext = createContext<any | null>(null);

function ShoppingCartProvider({children}): JSX.Element {
    const [shoppingCart, setShoppingCart] = useState([]);
    const {token} = useContext(UserContext)

    useEffect(() => {
		(async () => {
            const data = await getShoppingCartItems(token);
            setShoppingCart(data);
		})();
	}, []);

    const order = async (productId: string, number: number) => {
        const newShoppingCart = await updateShoppingCart(token, productId, number);
        setShoppingCart(newShoppingCart);
    }

    const remove = () => {
        setShoppingCart([]);
    } 

    return (
        <ShoppingCartContext.Provider value={{shoppingCart, order, remove}}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCartProvider;