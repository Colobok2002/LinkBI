import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ContactsStyles() {
    const theme = useSelector(state => state.theme.styles);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundColor,
            display: "flex",
            flexDirection:"column",
        },
        userItem: {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            padding: 10,
        },
        userItemSubContent: {
            borderBottomColor: "#C0C0C0",
            borderBottomWidth: 1,
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: 5,
            height: 60,
            justifyContent: "space-around",
            paddingVertical: 5,
        },
    }); 


    return { styles }
}
