import { View, Text, StyleSheet } from 'react-native'
import { Requests } from '../../data/ClassDpData';

function RequestsMnOverview({ route }) {
   const reqId= route.params.categoyId;

   const displayedReq = Requests.filter();

  return (
    <View style={styles.container}>
      <Text>RequestsMnOverview - {reqId}</Text>
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
