import {StyleSheet, View} from "react-native"
import {useDispatch, useSelector} from "react-redux";
import {ownRepType} from "../store";
import {useEffect} from "react";
import AvailableRepos from "../components/home/AvailableRepos";
import axios from "axios";
import MyButton from "../components/home/MyButton";
import MyInput from "../components/home/MyInput";
import MyCard from "../components/global/MyCard";

export default function Home(props: any) {
  const {owner, repo, availableRepos} = useSelector((state: ownRepType) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios.get(`https://api.github.com/users/${owner}/repos`)
        .then(response => {
          const repoNames = response.data.map((item: {name: string}) => item.name);
          dispatch({type: 'fetchRepos', payload: {availableRepos: repoNames}});
        })
        .catch(err => console.log("no user found"));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [owner]);

  const clearClickHandler = () => {
    dispatch({type: "clear"});
  }
  const retrieveClickHandler = () => {
    props.navigation.navigate('Issues');
  }
  const ownerInputChangeHandler = (newText: string) => {
    dispatch({
      type: "change",
      payload: {
        owner: newText,
        availableRepos: []
      }
    });
  }
  const repoInputChangeHandler = (newText: string) => {
    dispatch({
      type: 'change',
      payload: {
        repo: newText,
      }
    });
  }

  return (
    <MyCard style={styles.home}>
      <MyInput
        label='Repository Owner:'
        placeholder='enter owner'
        value={owner}
        onChangeText={ownerInputChangeHandler}
      />
      <MyInput
        label='Repository:'
        placeholder='enter repository'
        value={repo}
        onChangeText={repoInputChangeHandler}
      />
      <View style={styles.formButtons}>
        <MyButton
          title='Clear'
          onPress={clearClickHandler}
          disabled={!owner && !repo}
        />
        <MyButton
          title='Retrieve'
          onPress={retrieveClickHandler}
          disabled={!availableRepos.includes(repo)}
        />
      </View>
      <AvailableRepos />
    </MyCard>
  )
}

const styles = StyleSheet.create({
  home: {
    padding: 16,
    margin: 16,
    minWidth: "90%",
  },
  formButtons: {
    flexDirection: 'row',
  },
})
