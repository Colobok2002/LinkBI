import { toggleTheme } from '../../redux/slices/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, Button } from 'react-native';


export default function Setting() {
    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === 'light' ? '#fff' : '#333' }}>
            <Text style={{ color: theme === 'light' ? '#000' : '#fff' }}>
                Current theme: {theme}
            </Text>
            <Button title="Toggle Theme" onPress={() => dispatch(toggleTheme())} />
        </View>
    )
}
