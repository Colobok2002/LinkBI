import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ApiUrl, useDebouncedFunction } from '../../../Constains';
import { setAuthenticated } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import SegmentedControl from '../Ui/SegmentedControl';
import * as SecureStore from 'expo-secure-store';
import MuTosat from '../Ui/MuToast';
import getApi from '../../../Api';
import JSEncrypt from 'jsencrypt';


const RegistrationScreen = () => {
    const { showNotification } = MuTosat()
    const { api } = getApi();

    const dispatch = useDispatch();
    const uuid = useSelector(state => state.session.uuid)
    const lokalPublicKey = useSelector(state => state.session.lokalPublicKey)
    const lokalPprivatKey = useSelector(state => state.session.lokalPprivatKey)


    const [name, setName] = useState('');
    const [soName, setSoName] = useState('');
    const [nik, setNik] = useState('@');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [uniqueNik, setUniqueNik] = useState(true);
    const [uniqueLogin, setUniqueLogin] = useState(true);
    const [chekState, setChekState] = useState(true)

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            padding: 20,
        },
        input: {
            borderRadius: 5,
            borderWidth: 1,
            marginBottom: 10,
            padding: 10,
            width: '100%',
        },
        sumbitBtn: {
            alignItems: "center",
            backgroundColor: chekState && uniqueNik && uniqueLogin && name.length > 0 && soName.length > 0 && nik.length > 1 && login.length > 0 && password.length > 0 ? "#acdd9a" : "#808080",
            borderRadius: 10,
            display: "flex",
            opacity: chekState && uniqueNik && uniqueLogin && name.length > 0 && soName.length > 0 && nik.length > 1 && login.length > 0 && password.length > 0 ? 1 : 0.3,
            padding: 20,

        }
    });


    useEffect(() => {
        if (login.length > 0 && nik.length > 1) {
            const requestData = {
                Uuid: uuid,
                Nik: nik,
                Login: login,
            };
            setChekState(false)
            chekUniqD(requestData)
                .then(() => {
                    setChekState(true)
                })
        }
    }, [nik, login]);

    const chekUniq = async (requestData) => {
        await api.post(ApiUrl + "/user/check-uniqueness-registration-data", requestData).then(response => {
            setUniqueNik(response.data.uniqueNik)
            setUniqueLogin(response.data.uniqueLogin)
        })
    }

    const chekUniqD = useDebouncedFunction(chekUniq, 500)

    const handleRegister = () => {

        if (chekState && uniqueNik && uniqueLogin && name.length > 0 && nik.length > 0 && login.length > 0 && password.length > 0) {

            const encryptor = new JSEncrypt();

            const requestData = {
                Uuid: uuid,
                pKey: lokalPublicKey,
                Name: name,
                SoName: soName,
                Nik: nik,
                Login: login,
                Password: password,
            };

            api.post(ApiUrl + "/user/registration", requestData).then(response => {
                encryptor.setPrivateKey(lokalPprivatKey);
                const token = encryptor.decrypt(response.data.token)
                SecureStore.setItem("userToken", token)
                dispatch(setAuthenticated())
            })
        } else {
            if (!chekState) {
                showNotification({ "message": "Дождитесь проверки на уникальность", "type": "i" })
            } else if (!uniqueNik || !uniqueLogin) {
                showNotification({ "message": "Поля ник и логин должны быть уникальн", "type": "i" })
            } else {
                showNotification({ "message": "Заполните все поля", "type": "i" })
            }
        }

    };

    return (
        <View style={{ flex: 1, width: "100%", }}>
            <View style={{ flex: 1, width: "100%" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Имя"
                    value={name}
                    onChangeText={(value) => name.length <= 30 ? setName(value) : showNotification({ "message": "Слишком длинное имя", type: "i" })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Фамилия"
                    value={soName}
                    onChangeText={(value) => soName.length <= 30 ? setSoName(value) : showNotification({ "message": "Слишком длинная фамилия", type: "i" })}
                />
                <TextInput
                    style={[styles.input, !uniqueNik ? { borderColor: "red" } : {}]}
                    placeholder="@Nickname"
                    value={nik}
                    onChangeText={(newNik) => nik.length <= 30 ? setNik('@' + newNik.replace(/^@/, '')) : showNotification({ "message": "Слишком длинный никнейм", type: "i" })}
                />
                <TextInput
                    style={[styles.input, !uniqueLogin ? { borderColor: "red" } : {}]}
                    placeholder="Login"
                    value={login}
                    onChangeText={(value) => login.length <= 30 ? setLogin(value) : showNotification({ "message": "Слишком длинный Login", type: "i" })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={(value) => password.length <= 30 ? setPassword(value) : showNotification({ "message": "Слишком длинный Password", type: "i" })}
                    secureTextEntry
                />
            </View>
            <TouchableOpacity style={styles.sumbitBtn} onPress={handleRegister} >
                <Text>Регистрация</Text>
            </TouchableOpacity>
        </View>
    );
};


const AuthScreen = () => {

    const { showNotification } = MuTosat()
    const { api } = getApi()

    const dispatch = useDispatch();
    const uuid = useSelector(state => state.session.uuid)
    const lokalPublicKey = useSelector(state => state.session.lokalPublicKey)
    const lokalPprivatKey = useSelector(state => state.session.lokalPprivatKey)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [registerations, setRegisterations] = useState("Авторизация")

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            flex: 1,
            gap: 20,
            marginTop: "75%",
            padding: 20,
        },
        input: {
            borderRadius: 5,
            borderWidth: 1,
            marginBottom: 10,
            padding: 10,
            width: '100%',
        },
        sumbitBtn: {
            alignItems: "center",
            backgroundColor: "#acdd9a",
            borderRadius: 10,
            display: "flex",
            padding: 20,

        }
    });

    const handleLogin = () => {
        const encryptor = new JSEncrypt();

        const requestData = {
            uuid: uuid,
            pKey: lokalPublicKey,
            login: username,
            password: password
        }

        api.post(ApiUrl + "/user/log-in-with-credentials", requestData).then(response => {
            encryptor.setPrivateKey(lokalPprivatKey);
            const token = encryptor.decrypt(response.data.token)
            SecureStore.setItem("userToken", token)
            SecureStore.deleteItemAsync("access_code")
            dispatch(setAuthenticated())
        })
    };

    return (
        <View style={styles.container}>
            <SegmentedControl options={["Авторизация", "Ргистрация"]} value={registerations} setValue={setRegisterations}></SegmentedControl>
            {registerations == "Ргистрация" ? (
                <RegistrationScreen></RegistrationScreen>
            ) : (
                <View style={{ flex: 1, width: "100%", }}>
                    <View style={{ flex: 1, width: "100%" }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Login"
                            value={username}
                            onChangeText={(value) => username.length <= 30 ? setUsername(value) : showNotification({ "message": "Слишком длинный Login", type: "i" })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={(value) => password.length <= 30 ? setPassword(value) : showNotification({ "message": "Слишком длинный Password", type: "i" })}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.sumbitBtn} onPress={handleLogin} >
                        <Text>Войти</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};


export default AuthScreen;
