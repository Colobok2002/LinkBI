import { StyleSheet, ScrollView, Text, View, TextInput, RefreshControl } from 'react-native'
import IconUser from '../Ui/IconUser'
import { useEffect, useState } from 'react';
import SerchFiled from '../Ui/SerchFiled';


export default function Contacts() {

    const [constacts, setContacts] = useState([
        {
            id: 1,
            userName: 'John',
            userSoName: 'Brown',
            lastVizit: 'Был(a) недавно',
        },
        {
            id: 2,
            userName: 'John',
            userSoName: 'Brown',
            lastVizit: 'Был(a) недавно',
        },
        {
            id: 3,
            userName: 'John',
            userSoName: 'Brown',
            lastVizit: 'Был(a) недавно',
        }
    ])

    const [isRefreshing, setRefreshing] = useState(false);
    const [isSearchVisible, setSearchVisible] = useState(false);

    const onRefresh = () => {
        setRefreshing(true)
        setSearchVisible(true);
        setRefreshing(false)
    };


    return (
        <>
            {isSearchVisible && (
                <SerchFiled></SerchFiled>
            )}
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        progressViewOffset={1}
                        tintColor="transparent"
                        progressBackgroundColor="transparent"
                    />
                }
                scrollEventThrottle={16}
            >
                {constacts.map(contact => (
                    <View key={contact.id} style={styles.userItem}>
                        <IconUser />
                        <View style={styles.userItemSubContent}>
                            <View style={styles.usetTitleContaner}>
                                <Text>{contact.userName} {contact.userSoName}</Text>
                            </View>
                            <View style={styles.lastVizit}>
                                <Text>{contact.lastVizit}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView >
        </>
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
        alignItems: "center",
        gap: 10,
        padding: 10,
    },
    userItemSubContent: {
        flex: 1,
        gap: 5,
        height: 60,
        paddingVertical: 5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: 1,
    },
    userlastVizit: {
        color: "red",
    }
});
