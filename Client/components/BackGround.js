import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BackGround = ({ children }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/mod1.jpg')}
                style={styles.backgroundImage}>
                {children}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});

export default BackGround;
