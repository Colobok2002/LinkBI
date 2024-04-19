import { ScrollView, Text, View, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux';
import { useState } from 'react';

import IconUser from '../Ui/IconUser'
import SerchFiled from '../Ui/SerchFiled';
import ContactsStyles from './ContactsStyles';


export default function Contacts() {

    const { styles } = ContactsStyles()
    const theme = useSelector(state => state.theme.styles);

    const [constacts, setContacts] = useState([
        {
            id: 1,
            userName: 'John',
            userSoName: 'Brown',
            lastVizit: 'Был(a) недавно',
        },
        {
            id: 2,
            userName: 'Kevin',
            userSoName: 'Vranch',
            lastVizit: 'Был(a) недавно',
        },
        {
            id: 3,
            userName: 'Antonio',
            userSoName: 'Smit',
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
                scrollEventThrottle={10}
            >
                {constacts.map(contact => (
                    <View key={contact.id} style={styles.userItem}>
                        <IconUser />
                        <View style={styles.userItemSubContent}>
                            <View style={styles.usetTitleContaner}>
                                <Text style={{ color: theme.activeItems }}>{contact.userName} {contact.userSoName}</Text>
                            </View>
                            <View style={styles.lastVizit}>
                                <Text style={{ color: theme.activeItems }}>{contact.lastVizit}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView >
        </>
    )
}

