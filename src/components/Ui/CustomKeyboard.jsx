import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BiometricAuth from '../Authorization/BiometricAuth';
import { delAuthenticated, setLoggedIn } from '../../redux/slices/userSlice';
import * as SecureStore from 'expo-secure-store';

const CustomKeyboard = () => {

    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.styles);
    const [inputValue, setInputValue] = useState('');
    const [errorCode, setErrorCode] = useState(false);
    const [successfullyCode, setSuccessfullyCode] = useState(false);
    const [pinCode, setPinCode] = useState("");
    const [createAccessСode, setCreateAccessСode] = useState(true);


    useEffect(() => {
        // SecureStore.deleteItemAsync("access_code")
        const AccessСode = SecureStore.getItem("access_code")
        if (AccessСode) {
            setCreateAccessСode(false)
            setPinCode(AccessСode)
        }
    }, []);


    const handelChangeInput = (newItem) => {
        const _inputValue = inputValue + newItem
        setInputValue(_inputValue)
        if (createAccessСode) {
            setErrorCode(false)
            if (pinCode.length + 1 < 5) {
                setPinCode(_inputValue)
            } else if (pinCode.length == 4 && _inputValue.length == 5) {
                setPinCode(_inputValue)
                setInputValue("")
            } else if (_inputValue.length == 5) {
                if (pinCode != _inputValue) {
                    setErrorCode(true)
                    Alert.alert(
                        'Pin-code не совпадают',
                        'Повторите попытку',
                        [
                            { text: 'Повторить', onPress: () => { setErrorCode(false); setPinCode(""), setInputValue("") } },
                        ],
                        { cancelable: false },
                    );
                } else {
                    SecureStore.setItem("access_code", _inputValue)
                    setSuccessfullyCode(true);
                    Alert.alert(
                        'Pin-code успешно установлен',
                        '',
                        [
                            { text: 'Продолжить', onPress: () => { dispatch(setLoggedIn()) } },
                        ],
                        { cancelable: false },
                    );
                }
            }

        } else {
            if (_inputValue.length == 5) {
                if (_inputValue == pinCode) {
                    setSuccessfullyCode(true);
                    setInputValue("")
                    dispatch(setLoggedIn())
                } else {
                    setErrorCode(true)
                    setInputValue("")
                }
            } else if (errorCode && _inputValue.length > 0) {
                setErrorCode(false)
            } else if (successfullyCode && _inputValue.length > 0) {
                setSuccessfullyCode(false)
            }
        }
    }


    const handleDeleteChar = () => {
        setInputValue(prev => prev.slice(0, -1));
    };

    const handleRemovePinCode = () => {
        Alert.alert(
            'Сбросить Pin-Code',
            'Вам нужно будет заного войти в аккаунт',
            [
                { text: 'Продолжить', onPress: () => { SecureStore.deleteItemAsync("access_code"), dispatch(delAuthenticated()) } },
                {
                    text: 'Отмена',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    };


    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
            flex: 1,
            gap: 30,
            justifyContent: 'flex-end',
            paddingBottom: 100
        },
        inputPassword: {
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
        },
        inputPasswordDot: {
            backgroundColor: theme.textColor,
            borderRadius: 100,
            height: 15,
            width: 15,
        },
        key: {
            alignItems: "center",
            borderRadius: 30,
            display: "flex",
            height: 80,
            justifyContent: 'center',
            width: 80,
        },
        keyDell: {
            alignItems: "center",
            display: "flex",
            height: 80,
            justifyContent: 'center',
            width: 80,
        },
        keyText: {
            color: theme.textColor,
            fontSize: 30,
        },
        keyboard: {
            flexDirection: 'column',
            gap: 10,
        },
        keyboardRow: {
            flexDirection: 'row',
            gap: 10,
        },
        passText: {
            color: theme.textColor,
            fontSize: 15,
        }
    });


    return (
        <View style={styles.container}>
            {createAccessСode ? (
                <Text style={styles.passText}>{pinCode.length == 5 ? "Повторите" : "Создайте"} Pin-code</Text>
            ) : (
                <Text style={styles.passText}>Введите Pin-code</Text>
            )}
            <View style={styles.inputPassword}>
                <View style={[styles.inputPasswordDot, inputValue.length > 0 ? { backgroundColor: "blue" } : {}, errorCode ? { backgroundColor: "red" } : {}, successfullyCode ? { backgroundColor: "green" } : {}]}></View>
                <View style={[styles.inputPasswordDot, inputValue.length > 1 ? { backgroundColor: "blue" } : {}, errorCode ? { backgroundColor: "red" } : {}, successfullyCode ? { backgroundColor: "green" } : {}]}></View>
                <View style={[styles.inputPasswordDot, inputValue.length > 2 ? { backgroundColor: "blue" } : {}, errorCode ? { backgroundColor: "red" } : {}, successfullyCode ? { backgroundColor: "green" } : {}]}></View>
                <View style={[styles.inputPasswordDot, inputValue.length > 3 ? { backgroundColor: "blue" } : {}, errorCode ? { backgroundColor: "red" } : {}, successfullyCode ? { backgroundColor: "green" } : {}]}></View>
                <View style={[styles.inputPasswordDot, inputValue.length > 4 ? { backgroundColor: "blue" } : {}, errorCode ? { backgroundColor: "red" } : {}, successfullyCode ? { backgroundColor: "green" } : {}]}></View>
            </View>
            <View style={styles.keyboard}>
                <View style={styles.keyboardRow}>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('1')}>
                        <Text style={styles.keyText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('2')}>
                        <Text style={styles.keyText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('3')}>
                        <Text style={styles.keyText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyboardRow}>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('4')}>
                        <Text style={styles.keyText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('5')}>
                        <Text style={styles.keyText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('6')}>
                        <Text style={styles.keyText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyboardRow}>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('7')}>
                        <Text style={styles.keyText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('8')}>
                        <Text style={styles.keyText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('9')}>
                        <Text style={styles.keyText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keyboardRow}>
                    <View style={styles.keyDell}>
                        {!createAccessСode && (
                            <BiometricAuth></BiometricAuth>
                        )}
                    </View>
                    <TouchableOpacity style={styles.key} onPress={() => handelChangeInput('0')}>
                        <Text style={styles.keyText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keyDell} onPress={handleDeleteChar}>
                        <Text style={styles.keyText}>⌫</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {!createAccessСode && (
                <TouchableOpacity onPress={handleRemovePinCode}>
                    <Text style={styles.passText}>
                        Забыли Pin-code ?
                    </Text>
                </TouchableOpacity>
            )}
            <Text style={styles.passText}>Версия 1.0.0</Text>
        </View>
    );
};

export default CustomKeyboard;
