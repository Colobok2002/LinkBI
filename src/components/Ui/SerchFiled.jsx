import { View, StyleSheet, TextInput } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';

export default function SerchFiled() {
    const theme = useSelector(state => state.theme.styles);

    return (
        <View style={{ backgroundColor: theme.backgroundColor }}>
            <View style={[styles.serchFiled, { backgroundColor: theme.textColor }]}>
                <Entypo name={"magnifying-glass"} size={20} />
                <TextInput style={styles.searchInput} placeholder="Поиск..." />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    serchFiled: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "start",
        paddingHorizontal: 20,
        gap: 10,
        margin: 10,
        borderRadius: 5,
        height: 40,
    },
});
