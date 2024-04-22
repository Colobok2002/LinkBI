import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MessageSubMenu = ({ myMessage }) => {
    return (
        <View style={styles.MessageSubMenuContaner}>
            <View style={[styles.myMessage]}>
                <Text style={{ padding: 10 }}>Reply</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    MessageSubMenuContaner: {
        width:"200%",
        backgroundColor: "red"
    },
    myMessage: {
        margin: "0 0 0 auto",
        // alignSelf: 'flex-end',
        // margin: 5,
        // padding: 10,
        // backgroundColor: '#ddf',
        // borderRadius: 10

    },
})

export default MessageSubMenu;
