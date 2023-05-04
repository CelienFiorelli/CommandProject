import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getUser } from "../utils/api";

function Profile({ token }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await getUser(token);
            setUser(data)
        })();
    }, [])

    return (
        <View style={{marginVertical: 16}}>
            <Text>{user ? `Bonjour ${user.firstname} ${user.lastname}` : ""}</Text>
        </View>
    )
}

export default Profile;