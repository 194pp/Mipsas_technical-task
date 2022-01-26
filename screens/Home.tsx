import {Pressable, StyleSheet, View, Text, TextInput} from "react-native"
import {useDispatch, useSelector} from "react-redux";
import {ownRepType} from "../store";
import {useEffect} from "react";
import AvailableRepos from "../components/home/AvailableRepos";
import axios from "axios";
import {issuesPepPage} from "../configs/configs";

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
      <View style={styles.box}>
        <Text style={styles.text}>Repository Owner:</Text>
        <TextInput
          placeholder={'enter owner'}
          value={owner}
          style={styles.textInput}
          onChangeText={ownerInputChangeHandler}
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Repository:</Text>
        <TextInput
          placeholder={'enter repository'}
          value={repo}
          style={styles.textInput}
          onChangeText={repoInputChangeHandler}
        />
      </View>
      <View style={styles.formButtons}>
        <Pressable onPress={clearClickHandler}>
          <Text style={styles.btn}>Clear</Text>
        </Pressable>
        <Pressable onPress={retrieveClickHandler}>
          <Text style={styles.btn}>Retrieve</Text>
        </Pressable>
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
  box: {
    borderBottomWidth: 1,
    marginBottom: 4,
    padding: 4,
    borderColor: "white",
  },
  textInput: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#7094be',
    fontWeight: 'bold',
  },
  formButtons: {
    flexDirection: 'row',
  },
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
