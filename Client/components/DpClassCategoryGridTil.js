import React, { useState } from "react";
import { Pressable, View, Text, StyleSheet, Image, Dimensions } from "react-native";

function DpClassCategoryGridTil({ title, color, onPress, image }) {
  const [showBubble, setShowBubble] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#f0f8ff", borderless: false }}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? color + "80" : color }, // Adjust opacity when pressed
        ]}
        onPress={onPress}
        onPressIn={() => setShowBubble(true)}
        onPressOut={() => setShowBubble(false)}
      >
        <Image source={image} style={styles.image} />
        {showBubble && (
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{title}</Text>
          </View>
        )}
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
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    overflow: "hidden",
  },
  bubble: {
    position: 'absolute',
    top: '50%', // Center the bubble vertically
    left: '50%', // Center the bubble horizontally
    transform: [{ translateX: -windowWidth * 0.2 }, { translateY: -windowWidth * 0.2 }],
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Increased opacity for better contrast
    paddingHorizontal: 12, // Increased padding for better readability
    paddingVertical: 8,
    borderRadius: 8,
  },
  bubbleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
});
