import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

export default function SerchFiled() {
    return (
        <View style={styles.serchFiled}>
            <Entypo name={"magnifying-glass"} size={20} />
            <TextInput style={styles.searchInput} placeholder="Поиск..." />
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
        backgroundColor: "#C0C0C0",
        gap: 10,
        margin: 10,
        borderRadius: 5,
        height: 40,
    },
});
