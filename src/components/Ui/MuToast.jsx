import Toast from 'react-native-toast-message';


export default function MuTosat() {

    const showNotification = ({ message, type = 'ok' }) => {
        switch (type) {
            case 'ok':
                Toast.show({
                    type: 'success',
                    text1: message
                });
                break;
            case 'er':
                Toast.show({
                    type: 'error',
                    text1: message
                });
                break;
            default:
                Toast.show({
                    type: 'info',
                    text1: message
                });
                break;
        }
    }

    return { showNotification };
}

