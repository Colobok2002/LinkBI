
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { StyleSheet, Platform } from 'react-native';

const Modalize = ({ children, onRequestClose, chekToIphone = false }) => {

    if (Platform.OS === 'ios') {
        return <>{children}</>;
    }

    const translateX = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationX > 0) {
                translateX.value = event.translationX;
            }
        })
        .onEnd((event) => {
            if (event.translationX > 100) {
                runOnJS(onRequestClose)();
            } else {
                translateX.value = withSpring(0, { damping: 12, stiffness: 70 });
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.modal, animatedStyle]}>
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    }
});

export default Modalize;
