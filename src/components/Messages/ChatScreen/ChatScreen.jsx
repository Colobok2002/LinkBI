import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function ChatScreen() {

    const theme = useSelector(state => state.theme.styles);
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

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}>
                        <Text style={{ color: theme.activeItems }}>{item.text}</Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10
    },
    myMessage: {
        alignSelf: 'flex-end',
        margin: 5,
        padding: 10,
        backgroundColor: '#ddf',
        borderRadius: 10
    },
    otherMessage: {
        alignSelf: 'flex-start',
        margin: 5,
        padding: 10,
        backgroundColor: '#fdd',
        borderRadius: 10
    },
    time: {
        fontSize: 10,
        color: 'grey',
        alignSelf: 'flex-end'
    }
});

export default ChatScreen;
