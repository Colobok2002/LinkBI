import { ScrollView, Text, View, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux';
import { useState } from 'react';

import IconUser from '../Ui/IconUser'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SerchFiled from '../Ui/SerchFiled';
import MessagesStyles from './MessagesStyles';


export default function Messages() {

    const { styles } = MessagesStyles()
    const theme = useSelector(state => state.theme.styles);

    const [isRefreshing, setRefreshing] = useState(false);
    const [isSearchVisible, setSearchVisible] = useState(false);

    const onRefresh = () => {
        setRefreshing(true)
        setSearchVisible(true);
        setRefreshing(false)
    };

    const [chats, setChats] = useState([
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

    return (
        <>
            {isSearchVisible && (
                <SerchFiled></SerchFiled>
            )}
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        progressViewOffset={1}
                        tintColor="transparent"
                        progressBackgroundColor="transparent"
                    />
                }
                scrollEventThrottle={10}
                style={styles.container}
            >
                {chats.map(chat => (
                    <View key={chat.id} style={styles.userItem}>
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
                    </View>
                ))}
            </ScrollView>
        </>
    )
}



