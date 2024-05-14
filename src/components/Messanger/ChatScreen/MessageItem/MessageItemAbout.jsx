import { setIsDragging } from '../../../../redux/slices/messageSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { useRef } from 'react';

import MessageSubMenu from '../../../Ui/MessageSubMenu';
import ChatScreenStyles from '../ChatScreenStyles';

const MessageItemAbout = () => {

    const dispatch = useDispatch();
    const { styles } = ChatScreenStyles();

    const message = useSelector(state => state.message.message);

    const scrollViewRef = useRef();

    if (message?.text) {

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
}

export default MessageItemAbout;
