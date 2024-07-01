import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = ({ cart, handleRemoveFromCart, handleUpdateQuantity, handleSendOrder }) => {

    const increaseQuantity = (productId) => {
        const item = cart.find(item => item.product.id === productId);
        handleUpdateQuantity(productId, item.quantity + 1);
    };

    const decreaseQuantity = (productId) => {
        const item = cart.find(item => item.product.id === productId);
        if (item.quantity > 1) {
            handleUpdateQuantity(productId, item.quantity - 1);
        } else {
            handleRemoveFromCart(productId);
        }
    };

    return (
        <ScrollView style={styles.cartContainer}>
            {cart.map(item => (
                <View key={item.product.id} style={styles.cartItem}>
                    {/* <Image style={styles.productImage} source={require(`../../../assets/${item.product.image}`)} /> */}
                    <Text style={styles.productName}>{item.product.name}</Text>
                    <Text style={styles.productPrice}>${item.product.price.toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => decreaseQuantity(item.product.id)}>
                            <Ionicons name="remove-circle" size={24} color="red" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => increaseQuantity(item.product.id)}>
                            <Ionicons name="add-circle" size={24} color="green" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleRemoveFromCart(item.product.id)}>
                        <Ionicons name="trash" size={24} color="red" style={styles.deleteButton} />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.sendOrderButton} onPress={handleSendOrder}>
                <Text style={styles.sendOrderButtonText}>Send Order</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    cartContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 10,
    },
    productName: {
        flex: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        flex: 1,
        fontSize: 16,
    },
    quantityContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityText: {
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 10,
    },
    sendOrderButton: {
        backgroundColor: '#FF6B3C',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        margin: 10,
    },
    sendOrderButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
