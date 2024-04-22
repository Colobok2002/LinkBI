import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Navigations from './src/components/Navigations/Navigations';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <Navigations></Navigations>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
