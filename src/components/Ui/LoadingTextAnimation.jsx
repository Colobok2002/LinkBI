import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const LoadingTextAnimation = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, [fadeAnim]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.Text style={{ opacity: fadeAnim, fontSize: 24 }}>
                Loading...
            </Animated.Text>
        </View>
    );
}

export default LoadingTextAnimation;
