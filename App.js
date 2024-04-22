import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Navigations from './src/components/Navigations/Navigations';
import store from './src/redux/store';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <Navigations />
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
