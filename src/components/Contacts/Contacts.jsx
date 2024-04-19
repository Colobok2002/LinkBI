import { ScrollView, Text, View, TextInput, RefreshControl } from 'react-native'
import IconUser from '../Ui/IconUser'
import { useState } from 'react';
import SerchFiled from '../Ui/SerchFiled';
import ContactsStyles from './ContactsStyles';


export default function Contacts() {

    const { styles } = ContactsStyles()

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

