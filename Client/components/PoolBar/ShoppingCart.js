// ShoppingCart.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ShoppingCart = ({ cart, onRemoveItem, onUpdateQuantity, onSubmitOrder }) => {

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text>{item.product.name} - {item.quantity}</Text>
            <View style={styles.cartItemControls}>
                <TextInput
                    style={styles.cartItemInput}
                    keyboardType="numeric"
                    value={item.quantity.toString()}
                    onChangeText={(value) => onUpdateQuantity(item.product.id, Number(value))}
                />
                <TouchableOpacity onPress={() => onRemoveItem(item.product.id)}>
                    <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shopping Cart</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.product.id.toString()}
                renderItem={renderCartItem}
            />
            <TouchableOpacity style={styles.submitButton} onPress={onSubmitOrder}>
                <Text style={styles.buttonText}>Send Order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
    cartItemControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartItemInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        marginRight: 10,
        width: 60,
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    submitButton: {
        borderBlockColor: '#FF6B3C',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ShoppingCart;
