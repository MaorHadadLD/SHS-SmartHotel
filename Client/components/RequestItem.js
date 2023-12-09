import { View, Text, Pressable, StyleSheet } from 'react-native'


export default function RequestItem({title}) {
  return (
    <View>
        <Pressable>
            <View style={styles.reqItem} >
                <Text style={styles.title} >{title}</Text>
            </View>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    reqItem: {
        margin: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8
    },

})