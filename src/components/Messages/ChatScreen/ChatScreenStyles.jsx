import { useSelector } from "react-redux";
import { StyleSheet } from "react-native"


export default function ChatScreenStyles() {

    const theme = useSelector(state => state.theme.styles);

    const styles = StyleSheet.create({
        modalViewContainer: {
            paddingVertical: 200,
        },
        centeredView: {
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
        },
        container: {
            backgroundColor: theme.backgroundColor,
            display: "flex",
            flexDirection: "column",
            flex: 1,
        },
        input: {
            borderColor: 'gray',
            borderWidth: 1,
            flex: 1,
            marginRight: 10,
            padding: 10
        },
        inputContainer: {
            flexDirection: 'row',
            padding: 10
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
        myMessage: {
            alignSelf: 'flex-end',
            backgroundColor: '#ddf',
            borderRadius: 10,
            margin: 5,
            padding: 10
        },
        otherMessage: {
            alignSelf: 'flex-start',
            backgroundColor: '#fdd',
            borderRadius: 10,
            margin: 5,
            padding: 10
        },
        time: {
            alignSelf: 'flex-end',
            color: 'grey',
            fontSize: 10
        },
        title: {
            alignItems: "center",
            backgroundColor: theme.backgroundColor,
            borderBottomColor: "#C0C0C0",
            borderBottomWidth: 1,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            height: 60,
            paddingHorizontal: 10,
        },
        titleUserContent: {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 20,
        },
    });

    return { styles }
}
