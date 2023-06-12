import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { getUsers, updateRole } from "../utils/api";
import { UserContext } from "./UserProvider";
import globalStyle from "../styles/globalStyle";
import { StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

function Gestion(props) {
    const [users, setUsers] = useState(null);
    const { token } = useContext(UserContext);

    const [selectUser, setSelectUser] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
		(async () => {
            const data = await getUsers(token);
            setUsers(data);
		})();
	}, []);

    return (
        <View style={{ position: "relative", display: "flex", flex: 1}}>
            <Text style={{ fontSize: 32, marginLeft: 16, marginBottom: 24, color: "white" }}>Liste des utilisateurs</Text>
            <ScrollView>
                <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-between" }}>
                    {users && users.map(u =>
                    <Pressable key={u._id} onPress={() => setSelectUser(u)} style={{width: "50%", display: "flex", alignItems: "center", marginBottom: 24}}>
                        <View style={[globalStyle.mainBorder, {backgroundColor: "#202020", width: "90%", padding: 8}]}>
                            <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>{u.firstname} {u.lastname}</Text>
                            <Text style={{color: "white"}}>{u.email}</Text>
                            <View style={[defaultStyle[u.role], defaultStyle.tag]}>
                                <Text style={{textTransform: "uppercase", fontSize: 10, color: "white"}}>{u.role}</Text>
                            </View>
                        </View>
                    </Pressable>
                    )}
                </View>
            </ScrollView>

            {selectUser && <Pressable style={defaultStyle.popup} onPress={() => setSelectUser(null)}>
                <Pressable>
                    <View style={[globalStyle.mainBorder, {backgroundColor: "#202020", padding: 24}]}>
                        <Text style={{ fontSize: 24, fontWeight: "600", color: "white" }}>{selectUser.firstname} {selectUser.lastname}</Text>
                        <Text style={{color: "white"}}>{selectUser.email}</Text>
                        <SelectDropdown data={["user", "restorer"]}
                            defaultValue={selectUser.role}
                            buttonStyle={[globalStyle.mainBorder, { marginTop: 24}]}
                            defaultButtonText={'Choix du rôle'}
                            renderDropdownIcon={isOpened => {
                                return <AntDesign name={isOpened ? 'upcircleo' : 'downcircleo'} color={'#009E27'} size={18} />;
                            }}
                            onSelect={(selectedItem, index) => {
                                updateRole(token, selectUser._id, selectedItem);
                                setUsers((users) => {
                                    return users.map(u => {
                                        if (u._id != selectUser._id) return u
                                        else {
                                            u.role = selectedItem;
                                            return u;
                                        }
                                    })
                                })
                                setSelectUser(null);
                            }}
                        />
                    </View>
                </Pressable>
            </Pressable>}
        </View>
    );
}

const defaultStyle = StyleSheet.create({
    user: {
        backgroundColor: "#006EFF",
        borderColor: "#0043FF",
    },
    admin: {
        backgroundColor: "#FF0008",
        borderColor: "#AA0008",
    },
    restorer: {
        backgroundColor: "#008C43",
        borderColor: "#00D954",
    },
    tag: {
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        marginTop: 8,
    },
    popup: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000080",
    }
});

export default Gestion;