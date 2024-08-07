import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'

export default function CategoryList({ setSelectedCategory }) {

    const categoryList = [
        {
            id: 1,
            name: 'Night Club',
            Value: 'night_club',
            icon: require('../../assets/night-club.png'),
        },
        {
            id: 2,
            name: 'Bar',
            Value: 'bar',
            icon: require('../../assets/bar-counter.png'),
        },
        {
            id: 3,
            name: 'Coffee Shop',
            Value: 'cafe',
            icon: require('../../assets/coffee-shop.png'),
        },
        {
            id: 4,
            name: 'Shopping Mall',
            Value: 'shopping_mall',
            icon: require('../../assets/mall.png'),
        },
        {
            id: 5,
            name: 'Restaurant',
            Value: 'restaurant',
            icon: require('../../assets/restaurant.png'),
        },
    ]

    return (
        <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 20 }}>
                Select Top Category
            </Text>

            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5 }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Category selected:", item.Value);
                            setSelectedCategory(item.Value);
                        }} >
                        <CategoryItem category={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
