import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

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
            { id: 1, text: "Привет, как дела?", sender: "other", time: "12:01" },
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

        const [showSubMenu, setShowSubMenu] = useState(false);

        const handleLongPress = () => {
            setShowSubMenu(!showSubMenu);
        };

        return (
            <>
                <TouchableOpacity
                    onLongPress={handleLongPress}
                    style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}
                >
                    <Text style={{ color: 'black' }}>{item.text}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </TouchableOpacity>
                {showSubMenu && (
                    <MessageSubMenu></MessageSubMenu>
                )}
            </>
        );
    }



    return (
        <MenuProvider style={{ flex: 1 }}>
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
        </MenuProvider >
    );
}
