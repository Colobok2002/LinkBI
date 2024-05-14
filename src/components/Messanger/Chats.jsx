import { ScrollView, Text, View, RefreshControl, TouchableOpacity, Button, TextInput, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MessagesStyles from './MessagesStyles';
import SwiperFlatList from 'react-native-swiper';
import IconUser from '../Ui/IconUser'
import { updateSerch } from '../../redux/slices/serchAnimationSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { ApiUrl, useDebouncedFunction } from '../../../Constains';


export default function Chats() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { styles } = MessagesStyles()
    const theme = useSelector(state => state.theme.styles);

    const [isRefreshing, setRefreshing] = useState(false);
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [serchValue, setSerchValue] = useState("");
    const [serchLoadind, setSerchLoading] = useState(false);
    const [serchResult, setSerchResult] = useState([])

    const serchRef = useRef(null)
    const swiperRef = useRef(null);

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



    useEffect(() => {
        setSerchLoading(true)
        getSerchResultD(serchValue)
    }, [serchValue]);


    const getSerchResultD = useDebouncedFunction((value) => getSerchResult(value), 500)

    const getSerchResult = (serchStr) => {
        if (serchStr.length > 0) {
            axios.get(ApiUrl + `/chats/find-chats?search_term=${serchStr}&uuid=2`).then((response) => {
                if (response.data.data) {
                    setSerchResult(response.data.data)
                } else {
                    setSerchResult([])
                }
            }).finally(() => setSerchLoading(false))
        } else {
            let serchHistory = SecureStore.getItem("serchHistory")
            if (!serchHistory) {
                serchHistory = []
                SecureStore.setItem("serchHistory", JSON.stringify([]))
            } else {
                serchHistory = JSON.parse(serchHistory)
            }
            setSerchResult(serchHistory)
            setSerchLoading(false)
        }
    }

    const serchOn = () => {
        setSearchVisible(true)
        handleToggleSearch()
    }

    const serchOff = () => {
        setSearchVisible(false)
        serchRef.current?.blur()
        handleToggleSearch()
        setSerchValue("")
    }

    const handleToggleSearch = () => {
        const newIndex = isSearchVisible ? 1 : 0;
        swiperRef.current?.scrollTo(newIndex);
    };

    const selektSerchItem = (itemId) => {
        const item = serchResult.find(item => item.user_id === itemId)
        let serchHistory = SecureStore.getItem("serchHistory")
        if (!serchHistory) {
            serchHistory = []
            SecureStore.setItem("serchHistory", JSON.stringify([]))
        } else {
            serchHistory = JSON.parse(serchHistory)
        }
        if (!serchHistory.find(item => item.user_id === itemId)) {
            serchHistory.push(item)
            SecureStore.setItem("serchHistory", JSON.stringify(serchHistory))
        }
        navigation.navigate('ChatScreen', { chatId: itemId })
        setTimeout(() => serchOff(), 1000)
    }

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <View style={{ backgroundColor: theme.backgroundColor, flex: 1, }}>
                            <View style={[styles.searchField, { backgroundColor: theme.textColor }]}>
                                <Entypo name={"magnifying-glass"} size={20} />
                                <TextInput ref={serchRef} style={styles.searchInput} onFocus={serchOn} value={serchValue} onChangeText={text => setSerchValue(text)} placeholder="Поиск..." />
                            </View>
                        </View>
                        {isSearchVisible && (
                            <Button onPress={serchOff} title="Отмена"></Button>
                        )}
                    </View>
                    <SwiperFlatList
                        ref={swiperRef}
                        loop={false}
                        showsPagination={false}
                        index={1}
                    >
                        <View>
                            {!serchLoadind ? (
                                <>
                                    {serchValue.length == 0 && (
                                        <View style={styles.userItem}>
                                            <Text style={{ color: theme.activeItems }}>Недавние</Text>
                                        </View>
                                    )}
                                    <ScrollView
                                        scrollEventThrottle={10}
                                        style={styles.container}
                                    >
                                        {serchResult.map(chat => (
                                            <TouchableOpacity
                                                key={chat.user_id}
                                                onPress={() => selektSerchItem(chat.user_id)}
                                                style={styles.userItem}
                                            >
                                                <IconUser size={25} />
                                                <View style={styles.userItemSubContent}>
                                                    <View style={styles.usetTitleContaner}>
                                                        <Text style={{ color: theme.activeItems }}>{chat.name} {chat.soName}</Text>
                                                    </View>
                                                    <View style={styles.usetTitleContaner}>
                                                        <Text style={{ color: theme.activeItems }}>{chat.nik}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </>
                            ) : (
                                <View style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ActivityIndicator></ActivityIndicator>
                                </View>
                            )}
                        </View>
                        <View>
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
                        </View>
                    </SwiperFlatList>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}



