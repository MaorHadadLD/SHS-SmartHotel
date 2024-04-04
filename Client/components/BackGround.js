import React from 'react';
import { View, ImageBackground } from 'react-native';

const BackGround = ({ children }) => {
    return (
        <View>
            <ImageBackground
                source={require('../assets/mod1.jpg')}
                style={{ height: "100%" }} />
            <View style={{position:"absolute"}}>
                {children}
            </View>
        </View>
    );
}



export default BackGround;