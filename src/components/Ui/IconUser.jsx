import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function IconUser() {
    return (
        <View style={styles.userIcon}>
            <Icon name={"user-astronaut"} size={40} />
        </View>
    )
}

const styles = StyleSheet.create({
    userIcon: {
        display: "flex",
        alignItems:"center",
        justifyContent: "center",
        backgroundColor: "#C0C0C0",
        padding: 10,
        borderRadius: 300,
        height : 60,
        width : 60,
    },
});
