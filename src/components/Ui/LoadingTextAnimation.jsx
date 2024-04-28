import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

const LoadingTextAnimation = () => {
    // Создаем анимируемую переменную
    const fadeAnim = useRef(new Animated.Value(0)).current; // Начальное значение прозрачности

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                // Последовательно анимируем значения
                Animated.timing(fadeAnim, { // Анимация увеличения прозрачности
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, { // Анимация уменьшения прозрачности
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
