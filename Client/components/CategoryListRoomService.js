import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryListRoomService({ categoryList, products, onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState('Food');
    const [quantities, setQuantities] = useState({});
    const [message, setMessage] = useState(null);
    const [messageError, setMessageError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleCategorySelect = (category) => {
        setSelectedCategory(selectedCategory === category.name ? null : category.name);
    };

    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };
    const handleAddToBasket = (product, quantity) => {
        const result = onAddToCart(product, quantity);
        if(result) {
            setMessage(`${quantity} ${product.name} is added to your cart ✔`);
        } else {
            setMessageError(`Please enter a valid quantity before adding to cart, maximum quantity is 10.`);
        }

        setModalVisible(true);

        // Reset the quantity for the specific product
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [product.id]: '',
        }));

        setTimeout(() => {
            setModalVisible(false);
            setMessage(null);
            setMessageError(null);
        }, 2000);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : [];

    return (
        <View style={{ flex: 1 }}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.modalOverlay}>
                {messageError && (
                        <View style={styles.modalContentError}>
                            <Text style={styles.messageText}>{messageError}</Text>
                        </View>
                    )}
                    {message && (
                        <View style={styles.modalContent}>
                            <Text style={styles.messageText}>{message}</Text>
                        </View>
                    )}
                </View>
            </Modal>
            <View style={styles.flatListContainer}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categoryList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleCategorySelect(item)}
                            style={[
                                styles.categoryButton,
                                selectedCategory === item.name && styles.selectedCategoryButton
                            ]}>
                            <Text style={styles.categoryButtonText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.categoryList}
                />
                <Ionicons name="arrow-forward-circle" size={24} color="#FF6b3c" style={styles.arrowIcon} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredProducts.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <Image source={product.img} style={styles.productImage} />
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>Price: ${product.price}</Text>
                        <View style={styles.quantityContainer}>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={quantities[product.id] ? quantities[product.id].toString() : ''}
                                onChangeText={(value) => handleQuantityChange(product.id, value === '' ? '' : Number(value))}
                            />
                            <TouchableOpacity
                                style={styles.addToBasketButton}
                                onPress={() => handleAddToBasket(product, quantities[product.id] ? quantities[product.id] : 1)}>
                                <Text style={styles.addToBasketButtonText}>Add to Basket</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#4CAF50',
        padding: 20,
        borderRadius: 10,
    },
    modalContentError: {
        backgroundColor: '#F44336',
        padding: 20,
        borderRadius: 10,
    },
    messageText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    flatListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryList: {
        paddingVertical: 10,
    },
    arrowIcon: {
        position: 'absolute',
        right: 0,
        opacity: 0.5, // Make the icon semi-transparent
    },
    categoryButton: {
        backgroundColor: '#f9f9f9',
        padding: 8, // Reduced padding
        marginHorizontal: 8, // Reduced margin
        borderRadius: 15, // Adjusted border radius
        borderColor: '#333',
        borderWidth: 1,
        minWidth: 100, // Reduced minimum width
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    selectedCategoryButton: {
        backgroundColor: '#FF6b3c',
        borderColor: '#FF6b3c',
    },
    categoryButtonText: {
        fontSize: 14, // Reduced font size
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    productContainer: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#333',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 8,
        width: 60,
        marginRight: 10,
        borderRadius: 5,
    },
    addToBasketButton: {
        backgroundColor: '#FF6b3c',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addToBasketButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 5,
    },
});
