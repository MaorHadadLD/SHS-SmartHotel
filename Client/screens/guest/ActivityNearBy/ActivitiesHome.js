import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../../components/NearByActivities/Header';
import GoogleMapView from '../../../components/NearByActivities/GoogleMapView';
import CategoryList from '../../../components/NearByActivities/CategoryList';
import GlobalApi from '../../../API/GlobalApi';
import { UserLocationContext } from '../../../Context/UserLocationContext';
import PlaceList from '../../../components/NearByActivities/PlaceList';

export default function ActivitiesHome() {
    const [placeList, setPlaceList] = useState([]);
    const { location, setLocation } = useContext(UserLocationContext);

    useEffect(() => {
        if (location && location.coords) {
            GetNearBySearchPlace('restaurant');
        }
    }, [location]);

    const GetNearBySearchPlace = (value) => {
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

    const renderHeader = () => (
        <View>
            <Header />
            <GoogleMapView placeList={placeList} />
            <CategoryList setSelectedCategory={(value) => GetNearBySearchPlace(value)} />
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
