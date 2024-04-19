import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ContactsStyles() {
    const theme = useSelector(state => state.theme.styles);

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            gap: 10,
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
            height: 60,
            paddingVertical: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            borderBottomColor: "#C0C0C0",
            borderBottomWidth: 1,
        },
    }); 
    
    console.log(styles)

    return { styles }
}
