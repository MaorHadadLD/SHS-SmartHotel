import React from 'react';
import { TextInput } from 'react-native-gesture-handler';

const Field = (props) => {
    return (
        <TextInput
        {...props}
        style={{borderRadius: 100, color: "#bfbbba", paddingHorizontal: 10, width: '78%', 
        backgroundColor: 'rgb(220,220,220)', marginVertical: 10}}
        placeholderTextColor="#bfbbba">
        </TextInput>
    );

};

export default Field;