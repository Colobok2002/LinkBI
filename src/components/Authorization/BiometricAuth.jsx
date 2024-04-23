import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Импорт иконок Material

const BiometricAuth = () => {
    const [biometricType, setBiometricType] = useState(null);

    useEffect(() => {
        (async () => {
            const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
            if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                setBiometricType('face'); // Face ID доступен
            } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
                setBiometricType('fingerprint'); // Touch ID (отпечаток пальца) доступен
            }
        })();
    }, []);

    const handleBiometricAuth = async () => {
        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate',
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
        });

        if (biometricAuth.success) {
            alert('Authentication successful!');
        } else {
            alert('Authentication failed!');
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
});

export default BiometricAuth;
