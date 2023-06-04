import { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, login as loginUser, registerUser } from "../utils/api";

interface UserContextInterface {
    token: string | null;
    user: any | null;
    login: (email: string, password: string) => Promise<string>;
    logout: () => void;
    register: (email: string, password: string, firstname: string, lastname: string) => Promise<string>;
}

export const UserContext = createContext<UserContextInterface | null>(null);

function UserProvider({children}): JSX.Element {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
		(async () => {
			const localToken = await AsyncStorage.getItem('token');
			if (localToken && !token) {
                setToken(localToken);

                const fetchUser = await getUser(localToken);
                setUser(fetchUser);
            }
            setIsLoading(false)
		})();
	}, []);

    
    const register = async (email: string, password: string, firstname: string, lastname: string): Promise<string> => {
        const token_ = await registerUser(email, password, firstname, lastname);
        await AsyncStorage.setItem("token", token_)
        setToken(token_)
        return token_
    }
    const login = async (email: string, password: string): Promise<string> => {
        const token_ = await loginUser(email, password);
        await AsyncStorage.setItem("token", token_)
        setToken(token_)

        const fetchUser = await getUser(token_);
        setUser(fetchUser);
        
        return token_
    }
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null)
        setUser(null)
    }

    if (!isLoading) {
        return (
            <UserContext.Provider value={{token, user, login, logout, register}}>
                {children}
            </UserContext.Provider>
        );
    }
    return null;
}

export default UserProvider;