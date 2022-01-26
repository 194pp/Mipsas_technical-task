import {Pressable, StyleSheet, Text} from "react-native";

const MyButton = (props: any) => {
  return (
    <Pressable onPress={props.onPress}>
      <Text style={styles.btn}>{props.title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3d414a',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: '#7094be',
    borderWidth: 1,
    borderRadius: 2,
    margin: 2,
    color: 'white',
    textShadowColor: 'rgba(124,124,124,0)',
    textShadowRadius: 0,
    alignSelf: 'center'
  }
})

export default MyButton;
