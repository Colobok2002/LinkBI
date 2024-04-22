import { Modal, Text, View, TouchableWithoutFeedback, TouchableOpacity, Platform } from 'react-native';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatScreenStyles from '../ChatScreenStyles';
import { setMessage, setOpenModelAbout } from '../../../../redux/slices/messageSlice';
import MessageItemAbout from './MessageItemAbout';



const MessageItem = ({ item }) => {

    const dispatch = useDispatch();
    const { styles } = ChatScreenStyles();

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
        </>
    );
};


export default MessageItem;
