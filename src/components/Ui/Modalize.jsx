import Animated, { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const Modalize = ({ children, onRequestClose }) => {
    const translateX = useSharedValue(0);

    const navigation = useNavigation();
    const onGestureEvent = useAnimatedGestureHandler({
        onActive: (event) => {
            if (event.translationX > 0) {
                translateX.value = event.translationX;
            }
        },
        onEnd: (event) => {
            if (event.translationX > 100) {
                runOnJS(onRequestClose)();
            } else {
                translateX.value = withSpring(0, { damping: 12, stiffness: 70 });
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.modal, animatedStyle]}>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16
    }
});

export default Modalize;
