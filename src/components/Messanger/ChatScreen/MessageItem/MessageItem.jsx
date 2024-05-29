import { setMessage, setOpenModelAbout } from '../../../../redux/slices/messageSlice';
import { formatDate, formatDateTime } from '../../../../../Constains';
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { RightSwipeEvent } from '../../../Ui/Modalize';
import { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';
import ChatScreenStyles from '../ChatScreenStyles';

const MessageItem = ({ item }) => {
    const dispatch = useDispatch();
    const { styles } = ChatScreenStyles();
    const theme = useSelector(state => state.theme.styles);
    const windowWidth = useWindowDimensions().width;
    const maxWidth = windowWidth * 0.7;


    const [lastTap, setLastTap] = useState(null);

    const handleDoubleTap = useCallback(() => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 600;

        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            dispatch(setMessage(item));
            dispatch(setOpenModelAbout(true));
        } else {
            setLastTap(now);
        }
    }, [lastTap, item, dispatch]);

    return (
        <>
            <RightSwipeEvent>
                {item?.showDate && (
                    <View style={styles.dateInfo}>
                        <Text style={styles.dateInfoText}>{formatDate(item.created_at)}</Text>
                    </View>
                )}
                {item?.status === "loading" ? (
                    <View style={[item.is_my_message ? styles.myMessage : styles.otherMessage, item.message_text.length <= 40 ? { flexDirection: "row", gap: 10, maxWidth: maxWidth } : { maxWidth: maxWidth }]}>
                        <Text style={{ color: 'black' }}>{item.message_text}</Text>
                        <Feather name="clock" style={[styles.time, { fontSize: 13, marginTop: 3 }]} />
                    </View>
                ) : (
                    <TouchableOpacity
                        onLongPress={() => { dispatch(setMessage(item)); dispatch(setOpenModelAbout(true)); }}
                        onPress={handleDoubleTap}
                        style={[item.is_my_message ? styles.myMessage : styles.otherMessage, item.message_text.length <= 40 ? { flexDirection: "row", gap: 10, maxWidth: maxWidth } : { maxWidth: maxWidth }]}
                    >
                        <Text style={{ color: 'black' }}>{item.message_text}</Text>
                        <View style={{ display: "flex", flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "flex-end" }}>
                            <Text style={styles.time}>{formatDateTime(item.created_at)}</Text>
                            {item.is_my_message && (
                                <>
                                    {item.read ? (
                                        <Ionicons name="checkmark-done-sharp" size={12} color={theme.activeItems}></Ionicons>

                                    ) : (
                                        <Ionicons name="checkmark-done" size={12} color={theme.textColor}></Ionicons>
                                    )}
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            </RightSwipeEvent >
        </>
    );
};

const MemoizedMessageItem = memo(MessageItem);
MemoizedMessageItem.displayName = 'MemoizedMessageItem';

export default MemoizedMessageItem;
