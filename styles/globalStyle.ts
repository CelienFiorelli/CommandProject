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
    buttonTextHorizontal: {
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 8,
        backgroundColor: "#009E27",
        alignItems: 'center',
        flexDirection: "row",
    },
    mainBorder: {
        borderRadius: 8,
        borderColor: "#009E27",
        borderWidth: 1,
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
})