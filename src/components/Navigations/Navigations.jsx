import { delAuthenticated, setAuthenticated } from '../../redux/slices/userSlice';
import { setLokalKeys, setSession } from '../../redux/slices/sessionSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { ApiUrl } from '../../../Constains';

import ChatScreen from '../Messanger/ChatScreen/ChatScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthScreen from '../Authorization/AuthScreen';
import CustomKeyboard from '../Ui/CustomKeyboard';
import Messages from '../Messanger/Chats';
import Setting from '../Setting/Setting';

import LoadingTextAnimation from '../Ui/LoadingTextAnimation';
import JSEncrypt from 'jsencrypt';
import * as SecureStore from 'expo-secure-store';
import getApi from '../../../api/Api';


const RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {

    const theme = useSelector(state => state.theme.styles);
    const serchAnimation = useSelector(state => state.serchAnimation.serch)

    const tabBarStyle = useMemo(() => {
        return serchAnimation ? { display: 'none' } : { backgroundColor: theme.backgroundColor };
    }, [serchAnimation, theme]);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.activeItems,
                tabBarInactiveTintColor: theme.textColor,
                tabBarStyle: tabBarStyle,
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
            <>
                <Tab.Screen name="Сообщения" component={Messages}
                    options={{
                        headerShown: !serchAnimation,
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
            </>
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
    const publicKey = useSelector(state => state.session.publicKey)
    const { api } = getApi()

    useEffect(() => {
        (async () => {
            setLoading(true);

            let _uuid = uuid;
            if (uuid == null) {
                const response = await api.get(ApiUrl + "/token/generateToken");
                dispatch(setSession({
                    publicKey: response.data.public_key,
                    uuid: response.data.uuid,
                }));
                _uuid = response.data.uuid
            }
            const encryptor = new JSEncrypt();

            encryptor.getKey();

            const lokalPublicKey = encryptor.getPublicKey()

            dispatch(setLokalKeys({
                lokalPublicKey: lokalPublicKey,
                localPrivateKey: encryptor.getPrivateKey()
            }));

            const token = SecureStore.getItem("userToken");

            if (token && token != null && token != undefined) {

                const requestData = {
                    uuid: _uuid,
                    pKey: lokalPublicKey,
                    token: token
                }

                await api.post(ApiUrl + `/user/chek-token`, requestData).then(() => {
                    dispatch(setAuthenticated())
                }).catch(() => dispatch(delAuthenticated()));
                
                setLoading(false);
            }
            setLoading(false);
        })()
    }, []);

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);

    if (loadind) {
        return (
            <LoadingTextAnimation></LoadingTextAnimation>
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