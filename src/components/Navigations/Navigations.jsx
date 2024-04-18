import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native'
import Contacts from '../Contacts/Contacts';
import Messages from '../Messages/Messages';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Setting from '../Setting/Setting';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
            screenOptions={{
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen name="Контакты" component={Contacts} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name={"contacts"} size={size} color={color} />
                ),
            }} />
            <Tab.Screen name="Сообщения" component={Messages}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name={"message"} size={size} color={color} />
                    ),
                }} />
            <Tab.Screen name="Настройки" component={Setting}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name={"settings"} size={size} color={color} />
                    ),
                }} />
        </Tab.Navigator>
    );
}


export default function Navigations() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}