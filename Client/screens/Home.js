import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import BackGround from "../components/BackGround";
import Btn from "../components/Btn";

const Home = (props) => {
    const navigation = useNavigation();
    return (
        <BackGround>
            <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
                <Text style={{ color: "white", fontSize: 64 }}>
                    Let the</Text>
                <Text style={{ color: "white", fontSize: 64, marginBottom: 40 }}>
                    Vacation begin </Text>
                <Btn bgColor="#FF6B3C" btnLabel="Start" textColor="white" Press={()=> props.navigation.navigate("Login")} />
            </View>
        </BackGround>
    );
}

const styles = StyleSheet.create({});

export default Home;
