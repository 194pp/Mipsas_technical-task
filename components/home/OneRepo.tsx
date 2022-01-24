import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";

const OneRepo = ({item} : {item: string}) => {
  const dispatch = useDispatch();

  const pressHandler = () => {
    dispatch({
      type: "change",
      payload: {
        repo: item,
      }
    });
  }

  return (
    <TouchableOpacity onPress={pressHandler}>
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "salmon",
  }
})

export default OneRepo;
