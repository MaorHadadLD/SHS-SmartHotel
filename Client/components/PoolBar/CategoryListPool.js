import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

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
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
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
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
            <View>
                {filteredProducts.map((product) => (
                    <View key={product.id} style={styles.productContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productPrice}>Price: {product.price}</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    categoryButton: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    selectedCategoryButton: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    subcategoryButton: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        borderRadius: 10,
        borderColor: '#333',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    selectedSubcategoryButton: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    productContainer: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
    },
    productName: {
        fontSize: 16,
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
    },
    addToBasketButton: {
        backgroundColor: 'lightgreen',
        padding: 5,
        borderRadius: 5,
    },
    addToBasketButtonText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
});
