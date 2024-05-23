import { ScrollView, Text, View, RefreshControl,FlatList, TouchableOpacity, Button, TextInput, ActivityIndicator, Animated, Easing } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import * as SecureStore from 'expo-secure-store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MessagesStyles from './MessagesStyles';
import SwiperFlatList from 'react-native-swiper';
import IconUser from '../Ui/IconUser'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { ApiUrl, formatDateTime, useDebouncedFunction } from '../../../Constains';
import { setActiveChat } from '../../redux/slices/userSlice';




export default function Chats() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { styles } = MessagesStyles()
    const theme = useSelector(state => state.theme.styles);
    const token = SecureStore.getItem("userToken");
    const encodedToken = encodeURIComponent(token);

    const [isRefreshing, setRefreshing] = useState(false);
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [serchValue, setSerchValue] = useState("");
    const [serchLoadind, setSerchLoading] = useState(false);
    const [serchResult, setSerchResult] = useState([])

    const serchRef = useRef(null)
    const swiperRef = useRef(null);

    const [chats, setChats] = useState([]);

    const [chatsSecured, setChatsSecured] = useState([])

    const inputWidth = useRef(new Animated.Value(1)).current;
    const buttonPosition = useRef(new Animated.Value(0)).current;

    const socketRef = useRef()

    useEffect(() => {
        getChats()
        axios.get(ApiUrl + `/chats/get-chats-secured?user_token=${encodedToken}&uuid=1`).then((response) => {
            if (response.data.data) {
                setChatsSecured(response.data.chatsSecured)
            }
        })
    }, []);

    const getChats = () => {
        axios.get(ApiUrl + `/chats/get-chats?user_token=${encodedToken}&uuid=1`).then((response) => {
            if (response.data.chats) {
                setChats(response.data.chats)
            }
        })
    }

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
        setSearchVisible(true);
        Animated.timing(inputWidth, {
            toValue: 0.8,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        setSearchVisible(!isSearchVisible);
        handleToggleSearch()
    }

    const widthInterpolate = inputWidth.interpolate({
        inputRange: [0.8, 1],
        outputRange: ['90%', '100%']
    });

    const serchOff = (clearSerchInput = true) => {
        Animated.timing(inputWidth, {
            toValue: 1,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
        setSearchVisible(false)
        serchRef.current?.blur()
        handleToggleSearch()
        if (clearSerchInput) {
            setSerchValue("")
        }
    }


    const handleToggleSearch = () => {
        const newIndex = isSearchVisible ? 1 : 0;
        swiperRef.current?.scrollTo(newIndex);
    };

    const selektSerchItem = async (itemId, name, soName) => {

        const createChat = async () => {

            const token = SecureStore.getItem("userToken");

            const requestData = {
                "companion_id": itemId,
                "user_token": token,
                "uuid": "string"
            }

            let chatId = null

            await axios.post(ApiUrl + "/chats/create-chat", requestData).then(response => {
                chatId = response.data.chat_id
            })
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
            dispatch(setActiveChat(chatId))
        }
        createChat()
        navigation.navigate('ChatScreen', { name: name, soName: soName })
    }


    const renderItem = ({ item }) => (
        
        <TouchableOpacity
            onPress={() => {
                dispatch(setActiveChat(item.chat_id));
                navigation.navigate('ChatScreen', { name: item.companion_name, soName: item.companion_so_name });
            }}
            style={styles.userItem}
        >
            <IconUser size={30} />
            <View style={styles.userItemSubContent}>
                <View style={styles.usetTitleContaner}>
                    <Text style={{ color: theme.activeItems }}>{item.companion_name} {item.companion_so_name}</Text>
                    <View style={styles.userCheckAndTimeContaner}>
                        {item.lastMsgFromMe && (
                            <>
                                {item.lastMsgRead ? (
                                    <Ionicons name="checkmark-done-sharp" size={15} color={theme.activeItems}></Ionicons>
                                ) : (
                                    <Ionicons name="checkmark-done" size={15} color={theme.textColor}></Ionicons>
                                )}
                            </>
                        )}
                        <Text style={{ color: theme.activeItems }}>{formatDateTime(item.last_msg_time)}</Text>
                    </View>
                </View>
                <View style={styles.userLastMsgContaner}>
                    {item.lastMsg && (
                        <View style={styles.userLastMsg}>
                            <Text style={{ color: theme.activeItems }} numberOfLines={2} ellipsizeMode="tail">{item.lastMsg}</Text>
                        </View>
                    )}
                    {item.new_msg_count != 0 && (
                        <View style={styles.userCountMsg}>
                            <Text style={{ color: theme.activeItems }}>{item.new_msg_count}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Animated.View style={{ width: widthInterpolate }}>
                            <View style={[styles.searchField, { backgroundColor: theme.textColor }]}>
                                <Entypo name={"magnifying-glass"} size={20} />
                                <TextInput ref={serchRef} style={styles.searchInput} onFocus={serchOn} value={serchValue} onChangeText={text => setSerchValue(text)} placeholder="Поиск..." />
                            </View>
                        </Animated.View>
                        <TouchableOpacity onPress={serchOff} style={{ right: -5 }}>
                            <Ionicons name="close-circle-outline" size={24} color={theme.textColor} />
                        </TouchableOpacity>
                    </View>
                    <SwiperFlatList
                        ref={swiperRef}
                        loop={false}
                        showsPagination={false}
                        index={1}
                        onIndexChanged={(value) => {
                            if (value == 1) {
                                serchOff(false)
                            } else {
                                serchOn()
                            }
                        }}
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
                                                onPress={() => selektSerchItem(chat.user_id, chat.name, chat.soName)}
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
                            <Button title='Обновить' onPress={getChats}></Button>
                            <FlatList
                                data={chats}
                                renderItem={renderItem}
                                keyExtractor={item => item.chat_id.toString()}
                                contentContainerStyle={styles.contentContainer}
                                style={styles.container}
                            />
                        </View>
                    </SwiperFlatList>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}



