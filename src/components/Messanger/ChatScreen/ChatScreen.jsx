import { View, Text, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Platform, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { setIsDragging, setMessage, setOpenModelAbout } from '../../../redux/slices/messageSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-native';
import 'react-native-get-random-values';


import * as SecureStore from 'expo-secure-store';
import MessageItemAbout from './MessageItem/MessageItemAbout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MessageItem from './MessageItem/MessageItem';
import ChatScreenStyles from './ChatScreenStyles';
import IconUser from '../../Ui/IconUser';
import Modalize from '../../Ui/Modalize';
import ScrollToBottomChat from '../../Ui/ScrollToBottomChat';

import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { ApiUrl } from '../../../../Constains';

export default function ChatScreen() {

    const route = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { styles } = ChatScreenStyles();
    const { chatId } = route.params;
    const token = SecureStore.getItem("userToken");
    const encodedToken = encodeURIComponent(token);


    const theme = useSelector(state => state.theme.styles);
    const openModelAbout = useSelector(state => state.message.openModelAbout);
    const isDragging = useSelector(state => state.message.isDragging);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [showScrollDownButton, setShowScrollDownButton] = useState(false);
    const [countScrollDownButton, setCountScrollDownButton] = useState(0);

    const flatListRef = useRef()
    const inputRef = useRef(null);

    useEffect(() => {
        loadInitialMessages();
    }, []);

    const sendMessage = () => {
        if (text) {
            const newMessage = { id: messages.length + 1, text, itMyMessage: true, time: "12:03" };
            setMessages([newMessage, ...messages]);
            setText('');
            if (!showScrollDownButton) {
                setTimeout(() => scrollToEnd(), 300)
            }
        }
    };

    const loadInitialMessages = async () => {
        setLoading(true);
        await axios.get(ApiUrl + `/messages/get-messages?chat_id=${chatId}&user_token=${encodedToken}`).then((response) =>{
            console.log(response.data);
            setMessages(response.data)
        })

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


    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={openModelAbout}
                        onRequestClose={() => {
                            dispatch(setMessage(null)), dispatch(setOpenModelAbout(false));

                        }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                if (!isDragging) {
                                    dispatch(setMessage(null)),
                                        dispatch(setOpenModelAbout(false))
                                }
                                dispatch(setIsDragging(false))
                            }}
                        >
                            {Platform.OS === 'ios' ? (
                                <ExpoBlurView style={styles.centeredView} intensity={50}>
                                    <MessageItemAbout></MessageItemAbout>
                                </ExpoBlurView>
                            ) : (

                                <View style={[styles.centeredView, { backgroundColor: theme.backgroundColor }]}>
                                    <MessageItemAbout></MessageItemAbout>
                                </View>
                            )}
                        </TouchableWithoutFeedback>
                    </Modal >
                    <Modalize onRequestClose={() => navigation.navigate('Main')} chekToIphone={true}>
                        <View style={styles.title}>
                            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={styles.titleUserContent}>
                                <IconUser size={20} />
                                <View style={styles.titleSubContent}>
                                    <View style={styles.usetTitleContaner}>
                                        <Text style={{ color: theme.activeItems }}>John Brown</Text>
                                    </View>
                                    <View style={styles.lastVizit}>
                                        <Text style={{ color: theme.activeItems }}>Был(a) недавно</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View></View>

                        <FlatList
                            data={messages}
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
                        />
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={{
                                display: "flex", alignItems: "center", flexDirection: "row"
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
                                    style={{ flex: 1, maxHeight: 200, backgroundColor: "white", padding: 5 }}
                                    autoFocus={false}
                                />
                                <TouchableOpacity onPress={sendMessage} >
                                    <Feather name='send' size={24} color="#ADD8E6"></Feather>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </Modalize>
                </SafeAreaView>
            </SafeAreaProvider >

        </>
    );
}
