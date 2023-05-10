import { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginUser, registerUser } from "../utils/api";

interface UserContextInterface {
    token: string | null;
    login: (email: string, password: string) => Promise<string>;
    logout: () => void;
    register: (email: string, password: string, firstname: string, lastname: string) => Promise<string>;
}

export const UserContext = createContext<UserContextInterface | null>(null);

function UserProvider({children}): JSX.Element {
    const [token, setToken] = useState(null);

    useEffect(() => {
		(async () => {
			const localToken = await AsyncStorage.getItem('token');
			if (localToken) setToken(localToken);

		})();
	}, []);

    
    const register = async (email: string, password: string, firstname: string, lastname: string): Promise<string> => {
        const token = await registerUser(email, password, firstname, lastname);
        AsyncStorage.setItem("token", token)
        setToken(token)
        return token
    }
    const login = async (email: string, password: string): Promise<string> => {
        const token = await loginUser(email, password);
        AsyncStorage.setItem("token", token)
        setToken(token)
        return token
    }
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null)
    }

    return (
        <UserContext.Provider value={{token, login, logout, register}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;