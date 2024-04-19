import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';

const MessageSubMenu = () => {
    return (
        <View style={styles.subMenu}>
            <Text style={{ padding: 10 }}>Reply</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    subMenu: {
        backgroundColor: "red",

    },
})

export default MessageSubMenu;
