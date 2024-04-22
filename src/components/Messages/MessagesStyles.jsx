import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";


export default function MessagesStyles() {
    const theme = useSelector(state => state.theme.styles);

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.backgroundColor,
        },
        userItem: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            padding: 10,
        },
        userItemSubContent: {
            flex: 1,
            gap: 5,
            paddingVertical: 5,
            borderBottomColor: "#C0C0C0",
            borderBottomWidth: 1,
        },
        usetTitleContaner: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
        },
        userCheckAndTimeContaner: {
            display: "flex",
            flexDirection: "row",
            gap: 5,
        },
        userLastMsgContaner: {
            display: "flex",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 5,
        },
        userLastMsg: {
            maxWidth: "80%",

            fontSize: 12,
            padding: 5,
            flexDirection: "row",
            backgroundColor: "#C0C0C0",
            borderRadius: 5
        },
        userCountMsg: {
            padding: 5,
            backgroundColor: "#C0C0C0",
            borderRadius: 5,
        }
    });

    return { styles }
}
