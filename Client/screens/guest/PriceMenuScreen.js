import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { spaTreatments } from '../../data/spaTreatments';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

function PriceMenuScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground source={require('../../assets/Spa-background.jpg')} style={styles.backgroundImage}>
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'transparent']}
                    style={styles.overlay}
                />
                <View style={styles.container}>
                    <Text style={styles.title}>Spa Treatments & Prices</Text>
                    <FlatList
                        data={spaTreatments}
                        keyExtractor={(item) => item.type}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemText}>{item.type}</Text>
                                <Text style={styles.priceText}>{item.price}</Text>
                            </View>
                        )}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
        color: '#333',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
    },
});

export default PriceMenuScreen;
