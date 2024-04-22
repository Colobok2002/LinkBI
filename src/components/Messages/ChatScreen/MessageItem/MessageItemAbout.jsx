import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MessageSubMenu from '../../../Ui/MessageSubMenu';
import ChatScreenStyles from '../ChatScreenStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDragging } from '../../../../redux/slices/messageSlice';

const MessageItemAbout = () => {

    const dispatch = useDispatch();
    const { styles } = ChatScreenStyles();
    const message = useSelector(state => state.message.message);

    const scrollViewRef = useRef();

    return (
        <>
            <ScrollView
                style={styles.modalView}
                contentContainerStyle={styles.modalViewContainer}
                onScrollBeginDrag={() => dispatch(setIsDragging(true))}
                onScrollEndDrag={() => dispatch(setIsDragging(false))}
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
