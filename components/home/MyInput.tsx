import {Text, TextInput, View, StyleSheet} from "react-native";

const MyInput = (props: any) => {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        style={styles.textInput}
        onChangeText={props.onChangeText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderBottomWidth: 1,
    marginBottom: 4,
    padding: 4,
    borderColor: "white",
  },
  label: {
    color: '#7094be',
    fontWeight: 'bold',
  },
  textInput: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyInput;
