import { FlatList } from "react-native";
import {ClassDpCategories} from "../../data/ClassDpData";
import DpClassCategoryGridTil from "../../components/DpClassCategoryGridTil";



function RequestsScreen({ navigation }) {

    function renderClassDpCategoryItem(itemData) {

        function pressHandler() {
            navigation.navigate('RequestsMn', {
                categoyId: itemData.item.id,
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

export default RequestsScreen;