import { useState, createContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextInterface {
    token: string | null;
    setToken: (newToken: string | null) => void;
  }

const UserContext = createContext<UserContextInterface>({
    token: null,
    setToken: () => {}
});

function UserProvider({children}): JSX.Element {
    const [token, setToken] = useState(null);

    useEffect(() => {
		(async () => {
			const localToken = await AsyncStorage.getItem('token');
			if (localToken) setToken(localToken);
		})();
	}, []);

    return (
        <UserContext.Provider value={{token, setToken}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
export const ctx = UserContext;