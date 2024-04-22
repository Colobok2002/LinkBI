import { View, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function IconUser({ size = 40 }) {

    // const theme = useSelector(state => state.theme.styles);

    const styles = StyleSheet.create({
        userIcon: {
            alignItems: "center",
            borderRadius: 300,
            display: "flex",
            height: size + 20,
            justifyContent: "center",
            padding: 10,
            width: size + 20,
        },
    });

    return (
        <View style={[styles.userIcon, { backgroundColor: "#CFCFCF" }]}>
            <Icon name={"user-astronaut"} size={size} />
        </View>
    )
}


