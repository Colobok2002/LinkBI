import { View, Text, TextInput, Button, FlatList, SafeAreaView as SAV, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { BlurView } from "@react-native-community/blur";
import { Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ChatScreenStyles from './ChatScreenStyles';
import IconUser from '../../Ui/IconUser';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageSubMenu from '../../Ui/MessageSubMenu';

export default function ChatScreen() {
    const theme = useSelector(state => state.theme.styles);
    const { styles } = ChatScreenStyles();
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        setMessages([
            { id: 1, text: "Привет, как дела?Привет, как дела?Привет, как дела?Привет, как дела?", sender: "other", time: "12:01" },
            { id: 2, text: "Всё хорошо, спасибо!", sender: "me", time: "12:02" }
        ]);
    }, []);

    const sendMessage = () => {
        if (text) {
            const newMessage = { id: messages.length + 1, text, sender: "me", time: "12:03" };
            setMessages([...messages, newMessage]);
            setText('');
        }
    };

    const MessageItem = ({ item }) => {
        const [modalVisible, setModalVisible] = useState(false);
        const [isDragging, setIsDragging] = useState(false);

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
                            style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}
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


        return (
            <>
                <TouchableOpacity
                    onLongPress={() => setModalVisible(true)}
                    style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}
                >
                    <Text style={{ color: 'black' }}>{item.text}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}

                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            if (!isDragging) {
                                setModalVisible(false);
                            }
                            setIsDragging(false);
                        }}
                    >
                        {Platform.OS === 'ios' ? (
                            <ExpoBlurView style={styles.centeredView} intensity={50}>
                                {renderContent()}
                            </ExpoBlurView>
                        ) : (

                            <View style={[styles.centeredView, { backgroundColor: "red" }]}>
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
                </SafeAreaView>
            </SafeAreaProvider>
            {/* </SafeAreaView> */}
        </>
    );
}
