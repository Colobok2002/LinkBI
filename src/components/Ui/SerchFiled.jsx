import { View, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';

import Entypo from 'react-native-vector-icons/Entypo';

export default function SerchFiled({ onPress = () => { } }) {

    const theme = useSelector(state => state.theme.styles);
    return (
        <View style={{ backgroundColor: theme.backgroundColor, flex: 1, }}>
            <View style={[styles.searchField, { backgroundColor: theme.textColor }]}>
                <Entypo name={"magnifying-glass"} size={20} />
                <TextInput style={styles.searchInput} onFocus={onPress} placeholder="Поиск..." />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchField: {
        alignItems: "center",
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        height: 40,
        justifyContent: "start",
        margin: 10,
        paddingHorizontal: 20,
    },
});
