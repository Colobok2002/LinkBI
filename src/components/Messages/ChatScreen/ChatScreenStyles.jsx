import { useSelector } from "react-redux";
import { StyleSheet } from "react-native"
export default function ChatScreenStyles() {

    const theme = useSelector(state => state.theme.styles);

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.backgroundColor,
            flex: 1,
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
            borderBottomColor: "#C0C0C0",
            borderBottomWidth: 1,
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
        },
        centeredView: {
            flex: 1,
            justifyContent: "flex-end",
            display: "flex",


        },
        modalView: {
            // backgroundColor : "red"
        },
        _modalViewContainer: {
            // marginHorizontal: 20,
            // marginVertical: 100,
            paddingVertical: 200,
        },
        get modalViewContainer() {
            return this._modalViewContainer;
        },
        set modalViewContainer(value) {
            this._modalViewContainer = value;
        },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
        },
    });

    return { styles }
}
