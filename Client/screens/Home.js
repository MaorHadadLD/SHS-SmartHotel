import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BackGround from "../components/BackGround";
import Btn from "../components/Btn";

const Home = (props) => {
    const navigation = useNavigation();
    return (
        <BackGround>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Let the
                </Text>
                <Text style={[styles.titleText, styles.marginBottom]}>
                    Vacation begin
                </Text>
                <Btn 
                    bgColor="#FF6B3C" 
                    btnLabel="Start" 
                    textColor="white" 
                    Press={() => props.navigation.navigate("Login")} 
                    style={styles.button} // Apply custom styles
                />
            </View>
        </BackGround>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 40,
        marginVertical: 100,
    },
    titleText: {
        color: "white",
        fontSize: 64,
    },
    marginBottom: {
        marginBottom: 40,
    },
    button: {
        alignSelf: 'flex-start', // Move the button to the left
        marginLeft: -20, // Adjust this value as needed to move the button further left
    },
});

export default Home;
