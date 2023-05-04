import { useState, createContext } from "react";

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

    return (
        <UserContext.Provider value={{token, setToken}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
export const ctx = UserContext;