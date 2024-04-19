import { useSelector } from "react-redux";
import { StyleSheet } from "react-native"
export default function ChatScreenStyles() {

    const theme = useSelector(state => state.theme.styles);

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.backgroundColor,
            flex: 1
        },
        title: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
            // justifyContent:'center',
            paddingHorizontal: 10,
            backgroundColor: theme.backgroundColor,
            height: 60,
        },
        titleUserContent: {
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
        },
        inputContainer: {
            flexDirection: 'row',
            padding: 10
        },
        input: {
            flex: 1,
            marginRight: 10,
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10
        },
        myMessage: {
            alignSelf: 'flex-end',
            margin: 5,
            padding: 10,
            backgroundColor: '#ddf',
            borderRadius: 10
        },
        otherMessage: {
            alignSelf: 'flex-start',
            margin: 5,
            padding: 10,
            backgroundColor: '#fdd',
            borderRadius: 10
        },
        time: {
            fontSize: 10,
            color: 'grey',
            alignSelf: 'flex-end'
        }
    });

    return { styles }
}
