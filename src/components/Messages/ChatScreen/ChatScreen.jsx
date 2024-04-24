import { View, Text, TextInput, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, Platform, ActivityIndicator } from 'react-native';
import { setIsDragging, setMessage, setOpenModelAbout } from '../../../redux/slices/messageSlice';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-native';

import MessageItemAbout from './MessageItem/MessageItemAbout';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageItem from './MessageItem/MessageItem';
import ChatScreenStyles from './ChatScreenStyles';
import IconUser from '../../Ui/IconUser';
import Modalize from '../../Ui/Modalize';

import Animated from 'react-native-reanimated';

export default function ChatScreen() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { styles } = ChatScreenStyles();


    const theme = useSelector(state => state.theme.styles);
    const openModelAbout = useSelector(state => state.message.openModelAbout);
    const isDragging = useSelector(state => state.message.isDragging);

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const flatListRef = useRef()

    useEffect(() => {
        loadInitialMessages();
    }, []);

    const sendMessage = () => {
        if (text) {
            const newMessage = { id: messages.length + 1, text, itMyMessage: true, time: "12:03" };
            setMessages([...messages, newMessage]);
            setText('');
        }
    };


    const loadInitialMessages = async () => {
        setLoading(true);
        const initialMessages = [
            { id: 25, text: 'Это последнее сообщение', itMyMessage: false, time: '12:25' },
        ];
        setTimeout(() => {
            setMessages(initialMessages);
            setLoading(false);
        }, 1000);
    };

    const loadMoreMessages = () => {
        setLoading(true);

        if (messages.length < 30) {

            const moreMessages = [
                { id: messages.length + 1, text: `Сообщение ${messages.length + 1}`, itMyMessage: messages.length % 2 === 0, time: `12:${30 + messages.length}` }
            ];

            setMessages(prevMessages => [...moreMessages, ...prevMessages]);
        }
        setLoading(false);
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
                                <Icon name="arrow-back" size={24} color="black" />
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
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            inverted
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <MessageItem item={item} />}
                            onEndReached={loadMoreMessages}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                            onContentSizeChange={() => {

                            }}
                            maintainVisibleContentPosition={{
                                minIndexForVisible: 0,
                            }}
                        />
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setText}
                                value={text}
                                placeholder="Введите сообщение..."
                            />
                            <Button title="Отправить" onPress={sendMessage} />
                        </View>
                    </Modalize>
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    );
}
