import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SegmentedControl = ({ options, value, setValue }) => {
    const [selectedOption, setSelectedOption] = useState(value);


    const handelSelekt = (value) => {
        if (setValue) {
            setValue(value)
        }
        setSelectedOption(value)
    }
    if (options && options.lengnt != 0) {
        return (
            <View style={styles.container}>
                {options.map(option => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.option,
                            { backgroundColor: option === selectedOption ? 'blue' : 'gray' }
                        ]}
                        onPress={() => handelSelekt(option)}
                    >
                        <Text style={styles.text}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        flexDirection: 'row',
        height: 40,
        overflow: 'hidden',
    },
    option: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
    }
});

export default SegmentedControl;
