import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#202020",
    },
    buttonIcon: {
        borderRadius: 100,
        paddingVertical: 2,
        paddingHorizontal: 2,
        backgroundColor: "#009E27",
        alignItems: 'center',
    },
    buttonText: {
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 8,
        backgroundColor: "#009E27",
        alignItems: 'center',
    },
    mainBorder: {
        borderRadius: 8,
        borderColor: "#009E27",
        borderWidth: 1,
    },
})