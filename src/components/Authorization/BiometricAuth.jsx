import { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Импорт иконок Material
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../redux/slices/userSlice';
import MuTosat from '../Ui/MuToast';

const BiometricAuth = () => {
    const [biometricType, setBiometricType] = useState(null);
    const dispatch = useDispatch();
    const { showNotification } = MuTosat()

    useEffect(() => {
        const initializeAuth = async () => {
            const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
            if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
                setBiometricType('fingerprint');
            }
            else if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                setBiometricType('face');
            }
            await handleBiometricAuth(false)
        };

        initializeAuth()

    }, []);

    const handleBiometricAuth = async (showMessage = true) => {
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Авторизация',
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
        });
        if (biometricAuth.success) {
            dispatch(setLoggedIn())
        } else {
            if (showMessage) {
                showNotification({ "message": "Ошибка биометрии (возможно она не настроена на ващем устройстве)", type: "er" })
            }
        }
    };

    return (
        <View style={styles.container}>
            {biometricType === 'face' && (
                <MaterialIcons name="face" size={40} onPress={handleBiometricAuth} />
            )}
            {biometricType === 'fingerprint' && (
                <MaterialIcons name="fingerprint" size={40} onPress={handleBiometricAuth} />
            )}
            {!biometricType && (
                <Button title="Authenticate" onPress={handleBiometricAuth} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    }
});

export default BiometricAuth;
