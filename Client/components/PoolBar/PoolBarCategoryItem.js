// import React from 'react';
// import { View, FlatList, Text, TouchableOpacity } from 'react-native';

// export default function PoolBarCategoryItem({ item, onProductSelect, onPress }) {
//     // Check if item is undefined or null
//     if (!item) {
//         return null;
//     }

//     // Rendering category item with its products
//     return (
//         <TouchableOpacity onPress={onPress}>
//             <View>
//                 {/* Category name */}
//                 <Text style={{ fontSize: 20 }}>{item.name || '(No Name)'}</Text>
//                 {/* Render products or subcategories */}
//                 {item.subcategories ? (
//                     // If category has subcategories
//                     <View>
//                         {item.subcategories.map((subcategory) => (
//                             <View key={subcategory.name}>
//                                 <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{subcategory.name}</Text>
//                                 {/* Render products under subcategory */}
//                                 <FlatList
//                                     data={subcategory.products}
//                                     renderItem={({ item }) => (
//                                         <TouchableOpacity onPress={() => onProductSelect(item)}>
//                                             {/* Render individual product */}
//                                             <View>
//                                                 <Text style={{ fontSize: 15 }}>{item.name}</Text>
//                                                 <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#333' }}>NIS {item.price}</Text>
//                                             </View>
//                                         </TouchableOpacity>
//                                     )}
//                                     keyExtractor={(item) => item.id.toString()}
//                                 />
//                             </View>
//                         ))}
//                     </View>
//                 ) : (
//                     // If category directly contains products
//                     <FlatList
//                         data={item.products}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity onPress={() => onProductSelect(item)}>
//                                 {/* Render individual product */}
//                                 <View>
//                                     <Text style={{ fontSize: 15 }}>{item.name}</Text>
//                                     <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#333' }}>NIS {item.price}</Text>
//                                 </View>
//                             </TouchableOpacity>
//                         )}
//                         keyExtractor={(item) => item.id.toString()}
//                     />
//                 )}
//             </View>
//         </TouchableOpacity>
//     );
// };
