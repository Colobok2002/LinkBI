import { setMessage, setOpenModelAbout } from '../../../../redux/slices/messageSlice';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import ChatScreenStyles from '../ChatScreenStyles';
import { RightSwipeEvent } from '../../../Ui/Modalize';
import { ScrollView } from 'react-native-gesture-handler';

const MessageItem = ({ item }) => {

    const dispatch = useDispatch();
    const { styles } = ChatScreenStyles();

    const [lastTap, setLastTap] = useState(null);

    const handleDoubleTap = () => {
        const now = Date.now();

        const DOUBLE_PRESS_DELAY = 600;

        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            dispatch(setMessage(item))
            dispatch(setOpenModelAbout(true))
        } else {
            setLastTap(now);
        }
    };


    return (

        <RightSwipeEvent>
            < TouchableOpacity
                onLongPress={() => { dispatch(setMessage(item)), dispatch(setOpenModelAbout(true)) }}
                onPress={handleDoubleTap}
                style={item.itMyMessage ? styles.myMessage : styles.otherMessage}
            >
                <Text style={{ color: 'black' }}>{item.text}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </ TouchableOpacity>
        </RightSwipeEvent>

    );
};


export default MessageItem;
