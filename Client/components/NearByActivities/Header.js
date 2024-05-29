import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ setSearchText, onSearch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        setSearchText(searchInput);
        onSearch();
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={24} color="#a1a09f" />
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput}
                    onChangeText={setSearchInput}
                    onSubmitEditing={handleSearch}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        width: Dimensions.get('screen').width * 0.9,
        elevation: 2,
    },
    searchInput: {
        marginLeft: 10,
        backgroundColor: '#fff',
        width: '90%',
    },
});
