import { FlatList } from "react-native";
import {React} from "react"
import {ClassDpCategories} from "../../data/ClassDpData";
import DpClassCategoryGridTil from "../../components/DpClassCategoryGridTil";

function renderClassDpCategoryItem(itemData) {
    return <DpClassCategoryGridTil title={itemData.item.title} color={itemData.item.color}/>;
}

function RequestsScreen() {
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