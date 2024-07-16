// import React, { useState } from 'react';
// import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { products } from '../../data/PoolBarMenu';

// const ProductList = ({ route, navigation }) => {
//     const { category } = route.params;

//     const categoryProducts = products.filter(product => product.category === category.name);

//     return (
//         <ScrollView style={styles.productListContainer}>
//             {categoryProducts.map(product => (
//                 <View key={product.id} style={styles.productContainer}>
//                     <Image source={product.image} style={styles.productImage} />
//                     <View style={styles.productDetails}>
//                         <Text style={styles.productName}>{product.name}</Text>
//                         <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
//                         <TouchableOpacity
//                             style={styles.addButton}
//                             onPress={() => handleAddToCart(product, 1)}
//                         >
//                             <Text style={styles.addButtonText}>Add to Cart</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             ))}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     productListContainer: {
//         flex: 1,
//         backgroundColor: '#f8f8f8',
//     },
//     productContainer: {
//         flexDirection: 'row',
//         marginBottom: 10,
//     },
//     productImage: {
//         width: 80,
//         height: 80,
//         borderRadius: 8,
//         marginRight: 10,
//     },
//     productDetails: {
//         flex: 1,
//     },
//     productName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     productPrice: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     addButton: {
//         marginTop: 5,
//         backgroundColor: '#FF6B3C',
//         padding: 10,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     addButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });

// export default ProductList;
