import {StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import {ownRepType} from "../../store";
import OneRepo from "./OneRepo";


const AvailableRepos = () => {
  const {availableRepos, repo} = useSelector((state: ownRepType) => state);

  return (
    <View style={styles.container}>
      {!!availableRepos && availableRepos.length > 0 ? availableRepos.filter((item: string) => {
        return item.includes(repo);
      }).map((item: string) => (
        <OneRepo key={item} item={item}/>
      )) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  }
});

export default AvailableRepos;
