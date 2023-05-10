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
    const [shoppingCart, setShoppingCart] = useState(null);
    const {token} = useContext(UserContext)

    useEffect(() => {
		(async () => {
            const data = await getShoppingCartItems(token);
            setShoppingCart(data);
		})();
	}, []);

    const order = async (productId: string, number: number) => {
        setShoppingCart((shoppingCarts) => {
            const editProducts = [...shoppingCarts];
            const productIndex = shoppingCarts.indexOf(shoppingCarts.find(p => p.product._id == productId));
            if (editProducts[productIndex].quantity + number <= 0) {
                editProducts.splice(productIndex, 1)
            } else {
                editProducts[productIndex].quantity += number;
            }
            return editProducts;
        });
        
        await updateShoppingCart(token, productId, number);
    }

    return (
        <ShoppingCartContext.Provider value={{shoppingCart, order}}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCartProvider;