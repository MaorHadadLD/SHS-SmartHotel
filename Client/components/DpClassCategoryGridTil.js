import React from "react";
import { Pressable, View, Text, StyleSheet, Image, Platform, Dimensions } from "react-native";

function DpClassCategoryGridTil({ title, color, onPress, image }) {
  console.log("Image Path:", image); // Add this log statement to check the image prop
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#f0f8ff", borderless: false }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? color + "80" : color }, // Adjust opacity when pressed
        ]}
        onPress={onPress}
      >
        <Image source={image} style={styles.image} />
        {/* <Text style={styles.title}>{title}</Text> */}
      </Pressable>
    </View>
  );
}

export default DpClassCategoryGridTil;

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  button: {
    width: windowWidth * 0.4, // Adjust the width of the slot
    height: windowWidth * 0.4, // Adjust the height of the slot
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginTop: -100,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
});
