
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'

import * as Clipboard from 'expo-clipboard';
import MuToast from './MuToast';
import { setOpenModelAbout } from '../../redux/slices/messageSlice';



const MessageSubMenu = () => {

    const dispatch = useDispatch();
    const message = useSelector(state => state.message.message);

    const { showNotification } = MuToast()

    const copyToClipboard = () => {
        Clipboard.setStringAsync(message.text);
        dispatch(setOpenModelAbout(false))
        showNotification({ message: "Сообщение успешно скопировано", type: "in" })
    };

    const styles = StyleSheet.create({
        MessageSubMenuContaner: {
            minWidth: "100%",
            paddingHorizontal: 5,
            display: "flex",
            alignItems: message.itMyMessage ? "flex-end" : "flex-start",
        },
        myMessage: {
            backgroundColor: "#ffffff",
            minWidth: 200,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#eeeeee"

        },
        myMessageAction: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#eeeeee"
        },
        myMessageActionDell: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            color: "red",
        }
    })

    return (
        <View style={styles.MessageSubMenuContaner}>
            <View style={[styles.myMessage]}>
                <TouchableOpacity style={styles.myMessageAction}>
                    <Text>Ответить</Text>
                    <FontAwesome5 name={"reply"}></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity style={styles.myMessageAction}>
                    <Text>Изменить</Text>
                    <FontAwesome5 name={"edit"}></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity onPress={copyToClipboard} style={styles.myMessageAction}>
                    <Text>Скопировать</Text>
                    <Feather name={"copy"} ></Feather>
                </TouchableOpacity>
                <TouchableOpacity style={styles.myMessageAction}>
                    <Text>Переслать</Text>
                    <FontAwesome5 name={"reply"} style={{ transform: [{ scaleX: -1 }] }}></FontAwesome5>
                </TouchableOpacity>
                <TouchableOpacity style={styles.myMessageActionDell}>
                    <Text style={{ color: "red" }}>Удаить</Text>
                    <Feather name={"delete"} style={{ color: "red" }}></Feather>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default MessageSubMenu;
