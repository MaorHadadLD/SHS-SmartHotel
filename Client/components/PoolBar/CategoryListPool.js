import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';

export default function CategoryListPool({ categoryList, products, onAddToCart }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [quantities, setQuantities] = useState({});

    const handleCategorySelect = (category) => {
        if (selectedCategory === category.name) {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
        } else {
            setSelectedCategory(category.name);
            setSelectedSubcategory(null); // Reset selected subcategory when a category is selected
        }
    };

    const handleSubcategorySelect = (subcategoryName) => {
        if (selectedSubcategory === subcategoryName) {
            setSelectedSubcategory(null);
        } else {
            setSelectedSubcategory(subcategoryName);
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: quantity,
        }));
    };

    const filteredProducts = selectedSubcategory
        ? products.filter(product => product.subcategories === selectedSubcategory)
        : selectedCategory && selectedCategory !== 'Alcohol'
            ? products.filter(product => product.category === selectedCategory)
            : [];

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                    contentContainerStyle={styles.categoryList}
                />
                {selectedCategory === 'Alcohol' && (
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categoryList.find(category => category.name === 'Alcohol').subcategories}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSubcategorySelect(item.name)}>
                                <View style={[styles.subcategoryButton, selectedSubcategory === item.name && styles.selectedSubcategoryButton]}>
                                    <Text style={styles.subcategoryButtonText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.subcategoryList}
                    />
                )}
            </View>
            <View style={styles.productListContainer}>
                {filteredProducts.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <Image source={product.image} style={styles.productImage} />
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>${product.price}</Text>
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#f9f9f9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 50, // Rounder shape like the example
        borderColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    selectedCategoryButton: {
        backgroundColor: '#FF6B3C',
        borderColor: '#FF6B3C',
    },
    categoryButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    subcategoryButton: {
        backgroundColor: '#f9f9f9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 50, // Rounder shape like the example
        borderColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    selectedSubcategoryButton: {
        backgroundColor: '#FF6B3C',
        borderColor: '#FF6B3C',
    },
    subcategoryButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    productContainer: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
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
        backgroundColor: '#FF6B3C',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    addToBasketButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    categoryList: {
        paddingHorizontal: 5,
    },
    subcategoryList: {
        paddingHorizontal: 5,
    },
    productListContainer: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 10, 
        
    },
    productImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,

    },
});
