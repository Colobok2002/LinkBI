import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import getApi from '../../../Api';
import { ApiUrl } from '../../../Constains';

import JSEncrypt from 'jsencrypt';
import SegmentedControl from '../Ui/SegmentedControl';
import { setAuthenticated } from '../../redux/slices/userSlice';


const RegistrationScreen = () => {
    const dispatch = useDispatch();
    const { api } = getApi();
    const uuid = useSelector(state => state.session.uuid)
    const publicKey = useSelector(state => state.session.publicKey)

    const [name, setName] = useState('');
    const [soName, setSoName] = useState('');
    const [nik, setNik] = useState('@');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            padding: 20,
            borderRadius: 10,

        }
    });


    const handleRegister = () => {
        try {

            const encryptor = new JSEncrypt();
            encryptor.setPublicKey(publicKey);

            const requestData = {
                Uuid: uuid,
                Name: encryptor.encrypt(name),
                SoName: encryptor.encrypt(soName),
                Nik: encryptor.encrypt(nik),
                Login: encryptor.encrypt(login),
                Password: encryptor.encrypt(password),
            };

            api.post(ApiUrl + "/user/registration", requestData).then(response => {
                console.log('Registration successful:', response.data);
            });
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <View style={{ flex: 1, width: "100%", }}>
            <View style={{ flex: 1, width: "100%" }}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Surname"
                    value={soName}
                    onChangeText={setSoName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="@Nickname"
                    value={nik}
                    onChangeText={newNik => setNik('@' + newNik.replace(/^@/, ''))}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Login"
                    value={login}
                    onChangeText={setLogin}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
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

    const dispatch = useDispatch();
    const { api } = getApi()
    const publicKey = useSelector(state => state.session.publicKey)
    const privatKey = useSelector(state => state.session.privatKey)

    const lokalPublicKey = useSelector(state => state.session.lokalPublicKey)
    const lokalPprivatKey = useSelector(state => state.session.lokalPprivatKey)

    const uuid = useSelector(state => state.session.uuid)


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [registerations, setRegisterations] = useState("Авторизация")


    const handleLogin = () => {
        try {

            const encryptor = new JSEncrypt();

            encryptor.setPublicKey(publicKey);
            const encryptedUsername = encryptor.encrypt(username);
            const encryptedPassword = encryptor.encrypt(password);

            const requestData = {
                uuid: uuid,
                pKey: lokalPublicKey,
                login: encryptedUsername,
                password: encryptedPassword
            }

            api.post(ApiUrl + "/user/log-in-with-credentials", requestData).then(response => {
                encryptor.setPrivateKey(lokalPprivatKey);
                const token = encryptor.decrypt(response.data.token)
                dispatch(setAuthenticated())
                SecureStore.setItem("userToken", token)
            })

        } catch (error) {
            console.error('Error encrypting data:', error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            flex: 1,
            marginTop: "75%",
            gap: 20,
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
            backgroundColor: "red",
            display: "flex",
            alignItems: "center",
            padding: 20,
            borderRadius: 10,

        }
    });


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
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
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
