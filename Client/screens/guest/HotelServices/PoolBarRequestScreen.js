import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import CategoryListPool from '../../../components/PoolBar/CategoryListPool';
import CartScreen from './CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { categoryList, products } from '../../../data/PoolBarMenu';
import { sendPostRequest } from '../../../API/RequestCalls'; // Ensure you have this API function

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

    // const handleSendOrder = async () => {
    //     try {
    //         if (cart.length > 0) {
    //             const order = {
    //                 cart: cart.map(item => ({
    //                     productId: item.product.id,
    //                     quantity: item.quantity,
    //                 })),
    //                 type: 'PoolBar', // Indicates this is a Pool Bar order
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
                    type: 'PoolBar', // Indicates this is a Pool Bar order
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
                            <LinearGradient
                                colors={['rgba(0,0,0,0.6)', 'transparent']}
                                style={styles.gradientOverlay}
                            />
                            <View style={styles.overlay}>
                                <Text style={styles.caption}>Order on the app, the order will be waiting for you at the bar</Text>
                                <View style={styles.menuContainer}>
                                    <CategoryListPool
                                        categoryList={categoryList}
                                        products={products}
                                        onAddToCart={handleAddToCart}
                                    />
                                </View>
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
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    menuContainer: {
        flex: 1,
        marginTop: 10,
    },
});

export default PoolBarRequestScreen;
