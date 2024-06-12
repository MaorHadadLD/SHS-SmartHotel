import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native';
import CategoryListPool from '../../../components/PoolBar/CategoryListPool';
import CartScreen from './CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { categoryList, products } from '../../../data/PoolBarMenu';

const PoolBarRequestScreen = ({ route }) => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product, quantity) => {
        if (quantity > 0) {
            const existingProductIndex = cart.findIndex(item => item.product.id === product.id);
            if (existingProductIndex > -1) {
                const newCart = [...cart];
                newCart[existingProductIndex].quantity += quantity;
                setCart(newCart);
            } else {
                setCart([...cart, { product, quantity }]);
            }
        } else {
            alert('Please enter a valid quantity before adding to cart');
        }
    };

    const handleSendOrder = async () => {
        try {
            if (cart.length > 0) {
                const order = {
                    cart: cart.map(item => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                    })),
                    type: 'PoolBar',
                    roomNumber: route.params.guestData.roomNumber,
                    selectedHotel: route.params.guestData.selectedHotel,
                };
                const response = await sendPostRequest(order); // Replace with your API request function
                if (response.success) {
                    alert('Order submitted successfully');
                    setCart([]);
                }
            } else {
                alert('Please add items to the cart before sending the order');
            }
        } catch (error) {
            console.error('Error sending order:', error.message);
        }
    };

    const handleRemoveFromCart = (productId) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        setCart(cart.map(item =>
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Menu"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="restaurant" color={color} size={size} />
                    ),
                }}
            >
                {() => (
                    <View style={styles.container}>
                        <ImageBackground source={require('../../../assets/pool_bar_background.jpg')} style={styles.backgroundImage}>
                            <View style={styles.overlay}>
                                <Text style={styles.caption}>Order now, the order will be waiting for you at the bar</Text>
                                <CategoryListPool
                                    categoryList={categoryList}
                                    products={products}
                                    onAddToCart={handleAddToCart}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Cart"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" color={color} size={size} />
                    ),
                }}
            >
                {() => (
                    <CartScreen
                        cart={cart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        handleUpdateQuantity={handleUpdateQuantity}
                        handleSendOrder={handleSendOrder}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 10,
    },
    caption: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
});

export default PoolBarRequestScreen;
