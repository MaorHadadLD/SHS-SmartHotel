import { Pressable, View, Text, StyleSheet, Platform } from "react-native";

function HotelItem({ hotelName, city,breakfastInfo, dinnerInfo, lobbyBarInfo, spaInfo, 
  wifiInfo, gymInfo, entertainmentInfo,poolInfo, PoolBarInfo,SynagogueInfo,KeyOnSaturday,checkOutInfo,color, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: '#f0f8ff' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{hotelName}</Text>
          <Text style={styles.city}>{city}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default HotelItem;

const styles = StyleSheet.create({
  gridItem: {
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  city: {
    fontSize: 16,
    color: '#666',
  },
  info: {
    fontSize: 16,
    color: '#666',
  }
});
