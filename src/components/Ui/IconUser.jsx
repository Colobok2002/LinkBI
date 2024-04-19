import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

export default function IconUser({ size = 40 }) {

    const theme = useSelector(state => state.theme.styles);
    const styles = StyleSheet.create({
        userIcon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 300,
            height: size + 20,
            width: size + 20,
        },
    });
    return (
        <View style={[styles.userIcon, { backgroundColor: "#CFCFCF" }]}>
            <Icon name={"user-astronaut"} size={size} />
        </View>
    )
}


