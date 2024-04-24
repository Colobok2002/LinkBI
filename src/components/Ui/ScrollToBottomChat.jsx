import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';



const ScrollToBottomChat = ({ show, scrollToEnd, countSctoll = null, countEvents = 0 }) => {

    const theme = useSelector(state => state.theme.styles);

    const opacity = useSharedValue(0);
    const scale = useSharedValue(0);
    const translateX = useSharedValue(100);

    const styles = StyleSheet.create({
        scrollButton: {
            alignItems: 'center',
            backgroundColor: theme.activeItems,
            borderRadius: 25,
            height: 50,
            justifyContent: 'center',
            position: "absolute",
            width: 50,
        },
        scrollButtonCount: {
            alignItems: "center",
            backgroundColor: "#ADD8E6",
            borderRadius: 200,
            display: "flex",
            height: 25,
            justifyContent: "center",
            position: "absolute",
            right: -18,
            top: -20,
            width: 25,

        },
        scrollButtonCountMessages: {
            color: theme.activeItems,
            fontSize: 15,

        }
    })

    useEffect(() => {
        if (countSctoll != null) {
            if (countSctoll < 100) {
                opacity.value = withSpring(0);
                scale.value = withSpring(0);
                translateX.value = withSpring(100);
            } else if (countSctoll < 150) {
                opacity.value = withSpring(countSctoll / 200);
                scale.value = withSpring(countSctoll / 200);
                translateX.value = withSpring(20);
            } else {
                opacity.value = withSpring(1);
                scale.value = withSpring(1);
                translateX.value = withSpring(20);
            }
        } else if (show) {
            opacity.value = withSpring(1);
            scale.value = withSpring(1);
            translateX.value = withSpring(20);
        } else {
            opacity.value = withSpring(0);
            scale.value = withSpring(0);
            translateX.value = withSpring(100);
        }
    }, [show, countSctoll]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateX: translateX.value },
                { scale: scale.value }
            ],
            position: 'absolute',
            right: 80,
            top: -60,
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <TouchableOpacity style={styles.scrollButton} onPress={scrollToEnd}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="arrow-down" size={24} color="#ADD8E6" />
                    {countEvents > 0 && (
                        <View style={styles.scrollButtonCount}>
                            <Text style={styles.scrollButtonCountMessages}>
                                {countEvents}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default ScrollToBottomChat;
