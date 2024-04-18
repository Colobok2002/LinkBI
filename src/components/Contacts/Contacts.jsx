import { StyleSheet, ScrollView, Text, View } from 'react-native'
import IconUser from '../Ui/IconUser'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Contacts() {
    // 
    return (
        <ScrollView style={styles.container}>
            <View style={styles.userItem}>
                <IconUser />
                <View style={styles.userItemSubContent}>
                    <View style={styles.usetTitleContaner}>
                        <Text>Username UserSoName</Text>
                        <View style={styles.userCheckAndTimeContaner}>
                            <Ionicons name="checkmark-done" size={15} color={"#C0C0C0"}></Ionicons>
                            <Text>12:31</Text>
                        </View>
                    </View>
                    <Text>И за статью</Text>
                </View>
            </View>
            <View style={styles.userItem}>
                <IconUser />
                <View style={styles.userItemSubContent}>
                    <View style={styles.usetTitleContaner}>
                        <Text>Username UserSoName</Text>
                        <View style={styles.userCheckAndTimeContaner}>
                            <Ionicons name="checkmark-done" size={15} color={"#6A0DAD"}></Ionicons>
                            <Text>12:31</Text>
                        </View>
                    </View>
                    <View style={styles.userLastMsgContaner}>
                        <Text style={styles.userLastMsg} numberOfLines={2} ellipsizeMode="tail">И за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статьюИ за статью</Text>
                        <Text style={{}}>30</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        gap: 10,
    },
    userItem: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        padding: 10,
    },
    userItemSubContent: {
        flex: 1,
        gap: 5,
    },
    usetTitleContaner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    userCheckAndTimeContaner: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
    },
    userLastMsgContaner: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 5,
    },
    userLastMsg: {
        maxWidth: "80%",
        fontSize : 12,
        paddingVertical: 5,
        flexDirection: "row",

    }
});
