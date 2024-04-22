import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MessageSubMenu from '../../../Ui/MessageSubMenu';
import ChatScreenStyles from '../ChatScreenStyles';
import { useSelector } from 'react-redux';

const MessageItemAbout = () => {

    const scrollViewRef = useRef();
    const { styles } = ChatScreenStyles();
    const message = useSelector(state => state.message.message);


    return (
        <>
            <ScrollView
                style={styles.modalView}
                contentContainerStyle={styles.modalViewContainer}
                onScrollBeginDrag={() => setIsDragging(true)}
                onScrollEndDrag={() => setIsDragging(false)}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                <View
                    style={message.itMyMessage ? styles.myMessage : styles.otherMessage}
                    onStartShouldSetResponder={() => true}
                >
                    <Text style={{ color: 'black' }}>{message.text}</Text>
                    <Text style={styles.time}>{message.time}</Text>
                </View>
                <View onStartShouldSetResponder={() => true}>
                    <MessageSubMenu />
                </View>
            </ScrollView>
        </>
    );
}

export default MessageItemAbout;
