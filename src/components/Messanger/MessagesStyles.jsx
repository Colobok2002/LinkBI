import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";


export default function MessagesStyles() {
    const theme = useSelector(state => state.theme.styles);
    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor,
            display: "flex",
            flexDirection: "column",
        },
        userCheckAndTimeContaner: {
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        userCountMsg: {
            backgroundColor: "#C0C0C0",
            borderRadius: 5,
            padding: 5,
        },
        userItem: {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 5,
        },
        userItemS: {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 10,
        },
        userItemSubContent: {
            borderBottomColor: "#C0C0C0",
            borderBottomWidth: 1,
            flex: 1,
            gap: 5,
            paddingVertical: 5,
        },
        userLastMsg: {
            fontSize: 12,
            maxWidth : "80%",
            paddingHorizontal: 5
        },
        userLastMsgContaner: {
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "row",
            gap: 5,
            height: 40,
            justifyContent: "space-between",
        },
        
        usetTitleContaner: {
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-between",
        },
    });

    return { styles }
}
