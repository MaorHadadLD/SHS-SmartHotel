import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';

export default function CategoryListRoomService({ categoryList, products, onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [quantities, setQuantities] = useState({});

    const handleCategorySelect = (category) => {
        setSelectedCategory(selectedCategory === category.name ? null : category.name);
    };

    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : [];

    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoryList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleCategorySelect(item)}
                        style={[styles.categoryButton, selectedCategory === item.name && styles.selectedCategoryButton]}>
                        <Text style={styles.categoryButtonText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <ScrollView>
                {filteredProducts.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <Image source={{ uri: `https://via.placeholder.com/100?text=${product.name}` }} style={styles.productImage} />
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
                                onPress={() => onAddToCart(product, quantities[product.id] ? quantities[product.id] : 1)}>
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
    categoryButton: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        borderColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid',
        minWidth: 100,
        alignItems: 'center',
    },
    selectedCategoryButton: {
        backgroundColor: '#FF6b3c',
        borderColor: '#FF6b3c',
    },
    categoryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
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
