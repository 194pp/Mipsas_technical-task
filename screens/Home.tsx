import {Pressable, StyleSheet, View, Text, TextInput} from "react-native"
import {useDispatch, useSelector} from "react-redux";
import {ownRepType} from "../store";
import {useEffect} from "react";
import AvailableRepos from "../components/home/AvailableRepos";
import axios from "axios";
import {issuesPepPage} from "../configs/configs";
import MyButton from "../components/home/MyButton";
import MyInput from "../components/home/MyInput";

export default function Home(props: any) {
  const {owner, repo} = useSelector((state: ownRepType) => state);
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
    axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?page1&per_page=${issuesPepPage}`)
      .then(response => {
        dispatch({
          type: "fetchIssues",
          payload: response.data,
        });
      })
      .then(() => props.navigation.navigate('Issues'))
      .catch(err => console.log("getting issues failed."));
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
    <View style={styles.home}>
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
        <MyButton title='Clear' onPress={clearClickHandler}/>
        <MyButton title='Retrieve' onPress={retrieveClickHandler}/>
      </View>
      <AvailableRepos />
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'rgb(63,63,63)',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    minWidth: "90%",
  },
  formButtons: {
    flexDirection: 'row',
  },
})
