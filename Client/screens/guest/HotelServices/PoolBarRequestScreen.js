import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { categoryList, products } from '../../../data/PoolBarMenu';
import CartScreen from './CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

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
                    <ScrollView style={styles.menuContainer}>
                        {categoryList.map(category => (
                            <View key={category.id} style={styles.categoryContainer}>
                                <Text style={styles.categoryTitle}>{category.name}</Text>
                                {category.subcategories ? (
                                    category.subcategories.map((subcategory, subIndex) => (
                                        <View key={subIndex}>
                                            <Text style={styles.subcategoryTitle}>{subcategory.name}</Text>
                                            {products
                                                .filter(product => product.category === category.name && product.subcategories === subcategory.name)
                                                .map(product => (
                                                    <View key={product.id} style={styles.productContainer}>
                                                          {/* <Image style={styles.productImage} /> */}
                                                        <View style={styles.productDetails}>
                                                            <Text style={styles.productName}>{product.name}</Text>
                                                            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                                                            <TouchableOpacity
                                                                style={styles.addButton}
                                                                onPress={() => handleAddToCart(product, 1)}
                                                            >
                                                                <Text style={styles.addButtonText}>Add to Cart</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                ))}
                                        </View>
                                    ))
                                ) : (
                                    products
                                        .filter(product => product.category === category.name)
                                        .map(product => (
                                            <View key={product.id} style={styles.productContainer}>
                                                {/* <Image style={styles.productImage} source={require('../../../assets/mod1.jpg')} /> */}
                                                <View style={styles.productDetails}>
                                                    <Text style={styles.productName}>{product.name}</Text>
                                                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                                                    <TouchableOpacity
                                                        style={styles.addButton}
                                                        onPress={() => handleAddToCart(product, 1)}
                                                    >
                                                        <Text style={styles.addButtonText}>Add to Cart</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))
                                )}
                            </View>
                        ))}
                    </ScrollView>
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
    menuContainer: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    categoryContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subcategoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginVertical: 5,
    },
    productContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        marginTop: 5,
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PoolBarRequestScreen;
