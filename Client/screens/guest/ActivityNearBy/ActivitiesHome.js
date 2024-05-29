import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Header from '../../../components/NearByActivities/Header';
import GoogleMapView from '../../../components/NearByActivities/GoogleMapView';
import CategoryList from '../../../components/NearByActivities/CategoryList';
import GlobalApi from '../../../API/GlobalApi';
import { UserLocationContext } from '../../../Context/UserLocationContext';
import PlaceList from '../../../components/NearByActivities/PlaceList';

export default function ActivitiesHome() {
    const [placeList, setPlaceList] = useState([]);
    const { location } = useContext(UserLocationContext);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (location && location.coords) {
            GetNearBySearchPlace('restaurant');
        }
    }, [location]);

    const GetNearBySearchPlace = (value) => {
      setSearchText('');
        console.log("Searching for places in category:", value);
        if (location && location.coords) {
            GlobalApi.nearByPlace(
                location.coords.latitude,
                location.coords.longitude, value
            ).then(resp => {
                console.log("API Response:", resp.data.results);
                setPlaceList(resp.data.results);
            }).catch(error => {
                console.error("Error fetching nearby places:", error);
            });
        } else {
            console.warn("Location is not available.");
        }
    }

    const handleSearch = () => {
        if (searchText) {
            GlobalApi.searchByText(searchText).then(resp => {
                console.log("Search Response:", resp.data.results);
                setPlaceList(resp.data.results);
            }).catch(error => {
                console.error("Error performing text search:", error);
            });
        }
    }

    const renderHeader = () => (
        <View>
            {/* <Header setSearchText={setSearchText} onSearch={handleSearch} /> */}
            <GoogleMapView placeList={placeList} />
            <CategoryList setSelectedCategory={(value) => GetNearBySearchPlace(value)} />
            {searchText && <Text style={{ fontSize: 20, marginTop: 10 }}>Search Results for "{searchText}"</Text>}
            {placeList.length === 0 && <Text style={{ fontSize: 20, marginTop: 10 }}>No Places Found</Text>}
            <Text style={{ fontSize: 20, marginTop: 10 }}>Found {placeList.length} Places</Text>
        </View>
    );

    return (
        <FlatList
            data={placeList}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
                <PlaceList placeList={[item]} />
            )}
            keyExtractor={(item) => item.place_id}
        />
    );
}
