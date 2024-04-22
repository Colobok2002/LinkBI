import { toggleTheme } from '../../redux/slices/themeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { View, Button } from 'react-native';


export default function Setting() {
    const styles = useSelector(state => state.theme.styles);
    const dispatch = useDispatch();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: styles.backgroundColor }}>
            <Button title="Изменить тему" onPress={() => dispatch(toggleTheme())} />
        </View>
    )
}
