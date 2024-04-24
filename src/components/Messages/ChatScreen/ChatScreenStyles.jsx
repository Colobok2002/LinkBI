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
        scrollButton: {
            position: 'absolute',
            right: 20,
            bottom: 80,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.activeItems,
            borderRadius: 25,
        },
        scrollButtonIcon: {

        },
        scrollButtonCount: {
            backgroundColor: "#ADD8E6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 200,
            height: 25,
            width: 25,
            position: "absolute",
            top: -20,
            right: -18,

        },
        scrollButtonCountMessages: {
            color: theme.activeItems,
            fontSize: 15,

        }
    });

    return { styles }
}
