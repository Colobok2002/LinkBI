
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Platform } from 'react-native';

const Modalize = ({ children, onRequestClose, chekToIphone = false }) => {

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

    if (chekToIphone && Platform.OS === 'ios') {
        return <>{children}</>;
    }

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                {children}
            </Animated.View>
        </GestureDetector>
    );
};

export default Modalize;
