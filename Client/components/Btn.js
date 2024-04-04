import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

export default function Btn({bgColor, btnLabel, textColor, Press}) {
    return (
        <TouchableOpacity 
        onPress={Press}
        style={{
            backgroundColor: bgColor,
            // padding: 100,
            borderRadius: 100,
            // marginVertical: 10,
            alignItems: "center",
            width: 350,
            paddingVertical: 5,
            marginVertical: 10
            
        }}>
            <Text style={{color: textColor, fontSize: 22, fontWeight: "bold"}}>
                {btnLabel}
                </Text>
        </TouchableOpacity>
    )
}

