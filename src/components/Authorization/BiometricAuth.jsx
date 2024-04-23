
import { View, Text, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const BiometricAuth = ({ navigation }) => {
    const handleBiometricAuth = async () => {
        const hasBiometricSupport = await LocalAuthentication.hasHardwareAsync();

        if (hasBiometricSupport) {
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
        } else {
            alert('Biometric authentication not supported');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Biometric Authentication</Text>
            <Button title="Authenticate" onPress={handleBiometricAuth} />
        </View>
    );
};