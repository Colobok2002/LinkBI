import { ScrollView, Text, View, RefreshControl, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MessagesStyles from './MessagesStyles';
import SerchFiled from '../Ui/SerchFiled';
import IconUser from '../Ui/IconUser'
import { updateSerch } from '../../redux/slices/serchAnimationSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function Chats() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { styles } = MessagesStyles()
    const theme = useSelector(state => state.theme.styles);

    const [isRefreshing, setRefreshing] = useState(false);
    const [isSearchVisible, setSearchVisible] = useState(false);

    const [chats] = useState([
        {
            id: 1,
            userName: 'John',
            userSoName: 'Brown',
            lastMsg: "eqwewqeqwewqewqeqwewqeqwewq",
            countNoReadMsg: 10,
            lastMsgFromMe: false,
            lastMsgRead: false,
            lastMsgTime: "12:30",
        },
        {
            id: 2,
            userName: 'Kevin',
            userSoName: 'Vranch',
            lastMsg: "eqwewqeqwewqewqeqwewqeqwewq",
            countNoReadMsg: 0,
            lastMsgFromMe: true,
            lastMsgRead: false,
            lastMsgTime: "12:30",
        },
        {
            id: 3,
            userName: 'Antonio',
            userSoName: 'Smit',
            lastMsg: "eqwewqeqwewqewqeqwewqeqwewq",
            countNoReadMsg: 0,
            lastMsgFromMe: true,
            lastMsgRead: true,
            lastMsgTime: "12:30",
        },
    ]);

    const onRefresh = () => {
        setSearchVisible(true);
        setRefreshing(false)
    };



    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>

                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <SerchFiled onPress={() => { dispatch(updateSerch(true)); setSearchVisible(true) }}></SerchFiled>
                        {isSearchVisible && (
                            <Button onPress={() => { dispatch(updateSerch(false)); setSearchVisible(false) }} title="Отмена"></Button>
                        )}
                    </View>
                    <ScrollView
                        scrollEventThrottle={10}
                        style={styles.container}
                    >
                        {chats.map(chat => (
                            <TouchableOpacity
                                key={chat.id}
                                onPress={() => navigation.navigate('ChatScreen', { chatId: chat.id })}
                                style={styles.userItem}
                            >
                                <IconUser />
                                <View style={styles.userItemSubContent}>
                                    <View style={styles.usetTitleContaner}>
                                        <Text style={{ color: theme.activeItems }}>{chat.userName} {chat.userSoName}</Text>
                                        <View style={styles.userCheckAndTimeContaner}>
                                            {
                                                chat.lastMsgFromMe && (
                                                    <>
                                                        {chat.lastMsgRead ? (
                                                            <Ionicons name="checkmark-done-sharp" size={15} color={chat.lastMsgRead ? theme.activeItems : theme.textColor}></Ionicons>
                                                        ) : (
                                                            <Ionicons name="checkmark-done" size={15} color={chat.lastMsgRead ? theme.activeItems : theme.textColor}></Ionicons>
                                                        )}
                                                    </>
                                                )
                                            }
                                            <Text style={{ color: theme.activeItems }}>{chat.lastMsgTime}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.userLastMsgContaner}>
                                        <View style={styles.userLastMsg}>
                                            <Text style={{ color: theme.activeItems }} numberOfLines={2} ellipsizeMode="tail">{chat.lastMsg}</Text>
                                        </View>
                                        {chat.countNoReadMsg != 0 && (
                                            <View style={styles.userCountMsg}>
                                                <Text style={{ color: theme.activeItems }}>30</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}



