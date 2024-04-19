import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../Messages/ChatScreen/ChatScreen';
import Contacts from '../Contacts/Contacts';
import Messages from '../Messages/Messages';
import Setting from '../Setting/Setting';

const RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {

    const theme = useSelector(state => state.theme.styles);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.activeItems,
                tabBarInactiveTintColor: theme.textColor,
                tabBarStyle: {
                    backgroundColor: theme.backgroundColor,
                },
                headerStyle: {
                    backgroundColor: theme.backgroundColor,
                },
                headerTintColor: theme.activeItems,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: theme.activeItems
                }
            }}
            initialRouteName="Сообщения"
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

function RootStackScreen() {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  }


export default function Navigations() {
    return (
        <NavigationContainer>
            <RootStackScreen />
        </NavigationContainer>
    );
}