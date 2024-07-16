import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

export default function Btn({bgColor, btnLabel, textColor, Press}) {
    return (
        <TouchableOpacity 
        onPress={Press}
        style={[styles.buttons, {backgroundColor: bgColor}]}>
            <Text style={[styles.text, {color: textColor}]}>
                {btnLabel}
                </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({ 
    buttons:{
            borderRadius: 100,
            alignItems: "center",
            width: 350,
            paddingVertical: 5,
            marginVertical: 10
    },
    text:{
        fontSize: 22, 
        fontWeight: "bold"
    }
});

    
