import { ScrollView, Text, View, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux';
import { useState } from 'react';

import IconUser from '../Ui/IconUser'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SerchFiled from '../Ui/SerchFiled';
import MessagesStyles from './MessagesStyles';


export default function Messages() {

    const { styles } = MessagesStyles()
    const theme = useSelector(state => state.theme.styles);

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
                style={styles.container}
            >
                <View style={styles.userItem}>
                    <IconUser />
                    <View style={styles.userItemSubContent}>
                        <View style={styles.usetTitleContaner}>
                            <Text style={{ color: theme.activeItems }}>Username UserSoName</Text>
                            <View style={styles.userCheckAndTimeContaner}>
                                <Ionicons name="checkmark-done" size={15} color={"#6A0DAD"}></Ionicons>
                                <Text style={{ color: theme.activeItems }}>12:31</Text>
                            </View>
                        </View>
                        <View style={styles.userLastMsgContaner}>
                            <View style={styles.userLastMsg}>
                                <Text style={{ color: theme.activeItems }} numberOfLines={2} ellipsizeMode="tail">123</Text>
                            </View>
                            <View style={styles.userCountMsg}>
                                <Text style={{ color: theme.activeItems }}>30</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}



