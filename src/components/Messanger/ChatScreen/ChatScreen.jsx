import { View, Text, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Platform, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { setIsDragging, setMessage, setOpenModelAbout } from '../../../redux/slices/messageSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ApiUrl, createWebSocketConnection, parseJsonString } from '../../../../Constains';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setActiveChat } from '../../../redux/slices/userSlice';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { Modal } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import MessageItemAbout from './MessageItem/MessageItemAbout';
import ScrollToBottomChat from '../../Ui/ScrollToBottomChat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MessageItem from './MessageItem/MessageItem';
import ChatScreenStyles from './ChatScreenStyles';
import * as SecureStore from 'expo-secure-store';
import IconUser from '../../Ui/IconUser';
import Modalize from '../../Ui/Modalize';
import MuTosat from '../../Ui/MuToast';
import axios from 'axios';


import 'react-native-get-random-values';


export default function ChatScreen() {


    const route = useRoute();
    const { name, soName } = route.params;

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { styles } = ChatScreenStyles();
    const { showNotification } = MuTosat()

    const token = SecureStore.getItem("userToken");
    const encodedToken = encodeURIComponent(token);

    const chatId = useSelector(state => state.user.activeChatId);
    const theme = useSelector(state => state.theme.styles);
    const openModelAbout = useSelector(state => state.message.openModelAbout);
    const isDragging = useSelector(state => state.message.isDragging);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(true);
    const [text, setText] = useState('');
    const [showScrollDownButton, setShowScrollDownButton] = useState(false);
    const [countScrollDownButton, setCountScrollDownButton] = useState(0);

    const flatListRef = useRef()
    const inputRef = useRef(null);
    const socketRef = useRef(null);


    const enhancedMessages = useMemo(() => {
        const result = [];
        let lastDate = null;

        for (let i = messages.length - 1; i >= 0; i--) {
            const item = messages[i];
            const messageDate = item?.status == "loading" ? new Date().toDateString() : new Date(item.created_at).toDateString();
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;
            result.unshift({ ...item, showDate });
        }
        return result;
    }, [messages]);


    useEffect(() => {
        return () => {
            dispatch(setActiveChat(null))
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    useEffect(() => {
        if (chatId) {
            InitialMessages()
        }
    }, [chatId]);

    const sendMessage = () => {
        if (text) {
            const temporary_message_id = uuidv4()
            const postData = {
                "temporary_message_id": temporary_message_id,
                "chat_id": chatId,
                "message_text": text,
                "user_token": token,
                "forwarded_from_chat_id": null,
                "forwarded_from_message_id": null,
                "reply_to_message_id": null,
            }
            const new_msg = {
                "temporary_message_id": temporary_message_id,
                "message_id": temporary_message_id,
                "chat_id": chatId,
                "message_text": text,
                "created_at": null,
                "forwarded_from_chat_id": null,
                "forwarded_from_message_id": null,
                "is_my_message": true,
                "reply_to_message_id": null,
                "sender_id": null,
                "status": "loading"
            }

            setMessages(prevMessages => [new_msg, ...prevMessages]);
            setTimeout(() => scrollToEnd(), 300)
            setText("")

            axios.post(ApiUrl + `/messages/add-message`, postData)
        }
    };





    const InitialMessages = async () => {
        setLoading(true);
        await axios.get(ApiUrl + `/messages/get-messages?chat_id=${chatId}&user_token=${encodedToken}`).then((response) => {
            if (response.data != null) {
                setMessages(response.data)
            }
            setTimeout(() => scrollToEnd(), 300)
        })
        createWebSocketConnection({ socketUrl: "/messagesWS/events-messages?chatId=" + chatId + '&userToken=' + encodedToken })
            .then((socket) => {
                socketRef.current = socket;
                socket.onmessage = (event) => {
                    const parsedData = parseJsonString(event.data);
                    if (parsedData && parsedData.newMessage) {
                        setMessages(prevMessages => {
                            const index = prevMessages.findIndex(
                                message =>
                                    message.temporary_message_id === parsedData.newMessage.temporary_message_id ||
                                    message.message_id === parsedData.newMessage.temporary_message_id
                            );
                            if (index !== -1) {
                                const updatedMessages = [...prevMessages];
                                updatedMessages[index] = parsedData.newMessage;
                                return updatedMessages;
                            }
                            return [parsedData.newMessage, ...prevMessages];
                        });
                        setTimeout(() => scrollToEnd(), 300);
                    }
                };
            })
            .catch(() => {
                showNotification({ "message": "Ошибка соеденения, перезагрузите страницу", "type": "er" })
            });

        setLoadingChat(false)
        setLoading(false);
    };

    const loadMoreMessages = () => {
        setLoading(true);

        setLoading(false);
    };

    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        setCountScrollDownButton(y)
        const threshold = 200;
        if (y > threshold) {
            setShowScrollDownButton(true);
        } else {
            setShowScrollDownButton(false);
        }
    };

    const scrollToEnd = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        setShowScrollDownButton(false);
    };



    const opacity = useSharedValue(0);

    useEffect(() => {
        if (!loadingChat) {
            opacity.value = withTiming(1, {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
            });
        }
    }, [loadingChat]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            flex: 1,
        };
    });


    const messageItemsRender = () => {
        if (!loadingChat)
            return (
                <>
                    <Animated.View style={animatedStyle}>
                        <FlatList
                            data={enhancedMessages}
                            ref={flatListRef}
                            inverted
                            keyExtractor={(item) => item.message_id}
                            renderItem={({ item }) => <MessageItem item={item} />}
                            onEndReached={loadMoreMessages}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                            onContentSizeChange={() => {
                            }}
                            onScroll={handleScroll}
                            maintainVisibleContentPosition={{
                                minIndexForVisible: 0,
                            }}
                            keyboardShouldPersistTaps='handled'
                            style={{ marginVertical: 10 }}
                        />
                    </Animated.View>
                </>
            )
        else {
            return (
                <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator></ActivityIndicator>
                </View>
            )
        }
    }

    return (
        <>
            <SafeAreaProvider>
                <View style={{ flex: 1 }}>
                    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.backgroundColor }} />
                    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={openModelAbout}
                            onRequestClose={() => {
                                dispatch(setMessage(null));
                                dispatch(setOpenModelAbout(false));
                            }}
                        >
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (!isDragging) {
                                        dispatch(setMessage(null));
                                        dispatch(setOpenModelAbout(false));
                                    }
                                    dispatch(setIsDragging(false));
                                }}
                            >
                                {Platform.OS === 'ios' ? (
                                    <ExpoBlurView style={styles.centeredView} intensity={50}>
                                        <MessageItemAbout />
                                    </ExpoBlurView>
                                ) : (
                                    <View style={[styles.centeredView, { backgroundColor: theme.backgroundColor }]}>
                                        <MessageItemAbout />
                                    </View>
                                )}
                            </TouchableWithoutFeedback>
                        </Modal>
                        <Modalize onRequestClose={() => navigation.navigate('Main')} chekToIphone={true}>
                            <View style={styles.title}>
                                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                                    <Ionicons name="arrow-back" size={24} color="black" />
                                </TouchableOpacity>
                                <View style={styles.titleUserContent}>
                                    <IconUser size={20} />
                                    <View style={styles.titleSubContent}>
                                        <View style={styles.usetTitleContaner}>
                                            <Text style={{ color: theme.textColor }}>{name} {soName}</Text>
                                        </View>
                                        <View style={styles.lastVizit}>
                                            <Text style={{ color: theme.textColor }}>Был(a) недавно</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {messageItemsRender()}
                        </Modalize>
                    </View>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{
                        display: "flex", alignItems: "center", flexDirection: "row",
                    }}
                >
                    <View style={styles.inputContainer}>
                        <ScrollToBottomChat show={showScrollDownButton} countSctoll={countScrollDownButton} scrollToEnd={scrollToEnd} countEvents={3}></ScrollToBottomChat>
                        <TextInput
                            label="Введите сообщение"
                            value={text}
                            ref={inputRef}
                            onChangeText={text => setText(text)}
                            multiline
                            style={{ flex: 1, minHeight: 50, maxHeight: 200, backgroundColor: theme.activeItems, padding: 15, borderColor: theme.textColor, borderWidth: 1, borderRadius: 20 }}
                            autoFocus={false}
                        />
                        <TouchableOpacity onPress={sendMessage} style={{ marginBottom: 5 }}>
                            <View style={{ borderRadius: 200, padding: 7, backgroundColor: "#ADD8E6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Feather name='send' size={24} color={theme.activeItems} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaProvider>
        </>
    );
}
