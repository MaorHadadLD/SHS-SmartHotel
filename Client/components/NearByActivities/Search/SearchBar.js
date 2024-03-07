import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ setSearchText }) {
    const [searchInput, setSearchInput] = useState();
    return (
        <View>
            <LinearGradient
                // Background Linear Gradient
                colors={[color = '#fff', "transparent"]}
                style={{ padding: 20, width: Dimensions.get("screen").width }}
            >
            </LinearGradient>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ fontSize: 35 }}>
                    Discover
                </Text>
            </View>
            <View
                style={{
                    display: "flex",
                    marginTop: 5,
                    flexDirection: "row",
                    padding: 10,
                    gap: 5,
                    elevation: 0.7,
                    alignItems: "center",
                    backgroundColor: '#fff',
                    borderRadius: 5,
                }}
            >
                <Ionicons name="search" size={24} color='#a1a09f' />
                <TextInput
                    placeholder="Search"
                    style={{ backgroundColor: '#fff', width: "80%" }}
                    onChangeText={(value) => setSearchInput(value)}
                    onSubmitEditing={() => setSearchText(searchInput)}
                />
            </View>
            <LinearGradient />

        </View>
    )
}