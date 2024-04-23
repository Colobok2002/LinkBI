
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Platform, View } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


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



export const RightSwipeEvent = ({ children, eventFunc = null }) => {
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0);
    const size = useSharedValue(1);
    const lastTranslationX = useSharedValue(0);


    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationX < 0) {
                translateX.value = event.translationX;
                if (lastTranslationX.value > translateX.value && translateX.value < -34) {
                    opacity.value = Math.max(0, Math.min(1, opacity.value + 0.06));
                    if (size.value <= 2) {
                        size.value = Math.max(1, size.value + 0.06);
                    }
                } else if (translateX.value > -50) {
                    opacity.value = Math.max(0, Math.min(1, opacity.value - 0.06));
                    if (size.value > 0) {
                        size.value = Math.max(1, size.value - 0.06);
                    }
                }
                lastTranslationX.value = translateX.value
            }
        })
        .onEnd((event) => {
            if (event.translationX < -20) {
                translateX.value = withSpring(0, { damping: 100, stiffness: 50 });
                if (eventFunc != null) {
                    runOnJS(eventFunc)();
                }
            } else {
                translateX.value = withSpring(0, { damping: 100, stiffness: 50 });
            }

            opacity.value = withSpring(0);
            size.value = withSpring(1);
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: size.value }],
        };
    });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[{ flex: 1, position: "relative" }, animatedStyle]}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {children}
                </View>
                <Animated.View style={[{ position: "absolute", bottom: 15, right: -30 }, textAnimatedStyle, iconAnimatedStyle]}>
                    <FontAwesome5 name="reply" size={10} color="white" />
                </Animated.View>
            </Animated.View>
        </GestureDetector>
    );
};
