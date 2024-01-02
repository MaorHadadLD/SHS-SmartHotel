import { View, FlatList, StyleSheet } from 'react-native'



import { Requests } from '../../data/ClassDpData';
import {RequestItem} from '../../components/RequestItem';

function RequestsMnOverview({ route }) {

   const reqId= route.params.categoryId;

   const displayedReq = Requests.filter((reqItem) => {
    return reqItem.categories.indexOf(reqId) >= 0;;
   });

   function renderReqItem(itemData) {

    const item = itemData.item;

    const reqItemProps = {
        title: item.title,
    }
    
    return <RequestItem title={itemData.item.title} />

   }

  return (
    <View style={styles.container}>
        <FlatList data={displayedReq} keyExtractor={(item) => item.id} renderItem={renderReqItem} />
    </View>
  )
};

export default RequestsMnOverview;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
});
