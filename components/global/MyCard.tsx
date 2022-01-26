import {StyleSheet, View} from "react-native";
import colors from "../../constants/colors";

const MyCard = (props: any) => {
  return (
    <View style={styles.card}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  }
})

export default MyCard;
