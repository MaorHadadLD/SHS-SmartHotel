import { Pressable, View, Text, StyleSheet, Platform } from "react-native";

function HotelItem({
  hotelName,
  city,
  breakfastInfo,
  dinnerInfo,
  lobbyBarInfo,
  spaInfo,
  wifiInfo,
  gymInfo,
  entertainmentInfo,
  poolInfo,
  PoolBarInfo,
  SynagogueInfo,
  KeyOnSaturday,
  checkOutInfo,
  color,
  onPress,
}) {
  return (
    <View style={styles.gridItem}>
    <Pressable
      android_ripple={{ color: "#f0f8ff", borderless: false }}
      style={({ pressed }) => [
      styles.button,
      pressed ? styles.buttonPressed : null,
    ]}
      onPress={onPress}
    >
      <View style={[styles.innerContainer, { backgroundColor: color }]}>
        <Text style={styles.title}>{hotelName}</Text>
        <Text style={styles.subtitle}>{city}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default HotelItem;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#333", // Adjust text color to match your design
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});