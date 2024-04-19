import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

export default function IconUser() {

    const theme = useSelector(state => state.theme.styles);
    return (
        <View style={[styles.userIcon, { backgroundColor: "#CFCFCF" }]}>
            <Icon name={"user-astronaut"} size={40} />
        </View>
    )
}

const styles = StyleSheet.create({
    userIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 300,
        height: 60,
        width: 60,
    },
});
