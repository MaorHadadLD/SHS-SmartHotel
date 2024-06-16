import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ImageBackground, ScrollView } from 'react-native';
import { sendPostRequest } from '../../../API/RequestCalls'; // Ensure you have this API function
import BackGround from '../../../components/BackGround';
import CategoryListRoomService from '../../../components/CategoryListRoomService';
import CartScreen from './CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { categoryList, products } from '../../../data/RoomServiceMenu';

const  RoomServiceRequestsScreen = ({ route }) => {
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

    // const handleSendOrder = async () => {
    //     try {
    //         if (cart.length > 0) {
    //             const order = {
    //                 cart: cart.map(item => ({
    //                     productId: item.product.id,
    //                     quantity: item.quantity,
    //                 })),
    //                 type: 'RoomService', // Indicates this is a Room Service order
    //                 roomNumber: route.params.guestData.roomNumber,
    //                 selectedHotel: route.params.guestData.selectedHotel,
    //             };
    //             const response = await sendPostRequest(order); // Replace with your API request function
    //             if (response.success) {
    //                 alert('Order submitted successfully');
    //                 setCart([]);
    //             }
    //         } else {
    //             alert('Please add items to the cart before sending the order');
    //         }
    //     } catch (error) {
    //         console.error('Error sending order:', error.message);
    //     }
    // };

    const handleSendOrder = async () => {
        try {
            if (cart.length > 0) {
                const order = {
                    cart: cart.map(item => ({
                        productId: item.product.id,
                        productName: item.product.name,
                        quantity: item.quantity,
                    })),
                    type: 'RoomService', // Indicates this is a Room Service order
                    roomNumber: route.params.guestData.roomNumber,
                    selectedHotel: route.params.guestData.selectedHotel,
                };
                console.log("OrderTest: ", order); // Debugging: Log order data
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
                name="RoomServiceMenu"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="restaurant" color={color} size={size} />
                    ),
                }}
            >
                {() => (
                    <View style={styles.container}>
                        <ImageBackground source={require('../../../assets/room_service.jpg')} style={styles.backgroundImage}>
                            <View style={styles.overlay}>
                                <ScrollView>
                                    <CategoryListRoomService
                                        categoryList={categoryList}
                                        products={products}
                                        onAddToCart={handleAddToCart}
                                    />
                                </ScrollView>
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
}

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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 10,
    },
    customRequestContainer: {
        padding: 16,
        marginTop: Platform.OS === 'ios' ? 40 : 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        justifyContent: 'center',
    },
    requestButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        minWidth: '40%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: '#27ae60',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        opacity: 0.9,
    },
});

export default RoomServiceRequestsScreen;
