import { View, Text, TextInput, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-native';

import ChatScreenStyles from './ChatScreenStyles';
import IconUser from '../../Ui/IconUser';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageSubMenu from '../../Ui/MessageSubMenu';
import Modalize from '../../Ui/Modalize';
import { setMessage, setOpenModelAbout } from '../../../redux/slices/messageSlice';

export default function ChatScreen() {
    const theme = useSelector(state => state.theme.styles);
    const dispatch = useDispatch();

    const { styles } = ChatScreenStyles();
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        setMessages([
            { id: 1, text: "Привет, как дела?Привет, как дела?Привет, как дела?Привет, как дела?", itMyMessage: false, time: "12:01" },
            { id: 2, text: "Всё хорошо, спасибо!", itMyMessage: true, time: "12:02" }
        ]);
    }, []);

    const sendMessage = () => {
        if (text) {
            const newMessage = { id: messages.length + 1, text, itMyMessage: true, time: "12:03" };
            setMessages([...messages, newMessage]);
            setText('');
        }
    };

    const MessageItem = ({ item }) => {

        const openModelAbout = useSelector(state => state.message.openModelAbout);

        // const [modalVisible, setModalVisible] = useState(false);
        const [isDragging, setIsDragging] = useState(false);
        const [lastTap, setLastTap] = useState(null);

        const handleDoubleTap = () => {
            const now = Date.now();
            const DOUBLE_PRESS_DELAY = 300;

            if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
                dispatch(setMessage(item))
                dispatch(setOpenModelAbout(true))
            } else {
                setLastTap(now);
            }
        };


        const renderContent = () => {
            return (
                <>
                    <ScrollView
                        style={styles.modalView}
                        contentContainerStyle={styles.modalViewContainer}
                        onScrollBeginDrag={() => setIsDragging(true)}
                        onScrollEndDrag={() => setIsDragging(false)}
                    >
                        <View
                            style={item.itMyMessage ? styles.myMessage : styles.otherMessage}
                            onStartShouldSetResponder={() => true}
                        >
                            <Text style={{ color: 'black' }}>{item.text}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                        <View onStartShouldSetResponder={() => true}>
                            <MessageSubMenu />
                        </View>
                    </ScrollView>
                </>
            );
        };


        // useEffect(() => {
        //     if (openModelAbout) {

        //     }
        // }, [openModelAbout]);


        return (
            <>
                <TouchableOpacity
                    onLongPress={() => { dispatch(setMessage(item)), dispatch(setOpenModelAbout(true)) }}
                    onPress={handleDoubleTap}
                    style={item.itMyMessage ? styles.myMessage : styles.otherMessage}
                >
                    <Text style={{ color: 'black' }}>{item.text}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </TouchableOpacity>
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
                            setIsDragging(false);
                        }}
                    >
                        {Platform.OS === 'ios' ? (
                            <ExpoBlurView style={styles.centeredView} intensity={50}>
                                {renderContent()}
                            </ExpoBlurView>
                        ) : (

                            <View style={[styles.centeredView, { backgroundColor: theme.backgroundColor }]}>
                                {renderContent()}
                            </View>
                        )}
                    </TouchableWithoutFeedback>
                </Modal >
            </>
        );
    };




    return (
        <>
            {/* <SafeAreaView style={styles.container}> */}
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
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
                            data={messages}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <MessageItem item={item} />
                            )}
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
            {/* </SafeAreaView> */}
        </>
    );
}
