import { FlatList } from "react-native";
import {ClassDpCategories} from "../../data/ClassDpData";
import DpClassCategoryGridTil from "../../components/DpClassCategoryGridTil";

/*
    On this page, the names of the hotel's departments will appear to the customer.
     After the customer clicks on a certain department, he will be transferred to the request page of the department he selected.

*/

function HotelServicesScreen({ navigation }) {

    function renderClassDpCategoryItem(itemData) {

        function pressHandler() {
            navigation.navigate('RequestsMnOverview', {
                departmentId: itemData.item.id,
            });
        }
    
        return <DpClassCategoryGridTil 
            title={itemData.item.title} 
            color={itemData.item.color} 
            onPress={pressHandler}
            // navigation={navigation}
        />;
    }

    return (
        <FlatList 
        data={ClassDpCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderClassDpCategoryItem} 
        numColumns={2}
        />
    );
};

export default HotelServicesScreen;