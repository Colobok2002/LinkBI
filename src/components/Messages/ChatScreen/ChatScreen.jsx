import { View, Text, TextInput, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-native';

import ChatScreenStyles from './ChatScreenStyles';
import IconUser from '../../Ui/IconUser';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageSubMenu from '../../Ui/MessageSubMenu';
import Modalize from '../../Ui/Modalize';
import { setMessage, setOpenModelAbout } from '../../../redux/slices/messageSlice';
import MessageItem from './MessageItem/MessageItem';
import MessageItemAbout from './MessageItem/MessageItemAbout';

import { BlurView as ExpoBlurView } from 'expo-blur';


export default function ChatScreen() {

    const dispatch = useDispatch();
    
    const theme = useSelector(state => state.theme.styles);
    const openModelAbout = useSelector(state => state.message.openModelAbout);
    const { styles } = ChatScreenStyles();

    const navigation = useNavigation();


    const [isDragging, setIsDragging] = useState(false);

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
                                setIsDragging(false);
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
        </>
    );
}
