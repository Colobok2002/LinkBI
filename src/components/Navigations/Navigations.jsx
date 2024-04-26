import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../Messages/ChatScreen/ChatScreen';
import Contacts from '../Contacts/Contacts';
import Messages from '../Messages/Messages';
import Setting from '../Setting/Setting';
import AuthScreen from '../Authorization/AuthScreen';
import CustomKeyboard from '../Ui/CustomKeyboard';

import * as SecureStore from 'expo-secure-store';
import { setAuthenticated } from '../../redux/slices/userSlice';
import { Text } from 'react-native';
import getApi from '../../../Api';
import { ApiUrl } from '../../../Constains';
import { setSession } from '../../redux/slices/sessionSlice';


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
        <RootStack.Navigator
            initialRouteName='Main'
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen
                name="Main"
                component={MyTabs}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    headerShown: false,
                    cardStyleInterpolator: ({ current, layouts }) => ({
                        cardStyle: {
                            transform: [
                                {
                                    translateX: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layouts.screen.width, 0]
                                    }),
                                },
                            ],
                        },
                    }),
                }}
            />
        </RootStack.Navigator>
    )
}

export default function Navigations() {

    const dispatch = useDispatch();
    const [loadind, setLoading] = useState(false)
    const uuid = useSelector(state => state.session.uuid);
    const { api } = getApi()

    useEffect(() => {
        if (uuid == null) {
            api.get(ApiUrl + "/token/generateToken").then(response => {
                dispatch(setSession(
                    {
                        publicKey: response.data.public_key,
                        privatKey: response.data.privat_key,
                        uuid: response.data.uuid,

                    }
                ))
            }
            )
        }
        // dispatch(setAuthenticated())
        // const initializeAuth = async () => {
        //     const userId = await SecureStore.getItemAsync('userJWTToken');
        //     if (userId) {
        //     }
        //     setLoading(false)
        // };

        // initializeAuth();
    }, []);

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    if (loadind) {
        return (
            <Text> Loading ...</Text>
        )
    }
    if (isAuthenticated == false) {
        return (
            <AuthScreen />
        )
    }
    if (isLoggedIn == false) {
        return (
            <CustomKeyboard />
        )
    }

    return (
        <NavigationContainer>
            <RootStackScreen />
        </NavigationContainer>
    );
}