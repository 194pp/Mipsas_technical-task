import {View, FlatList, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {ownRepType} from "../store";
import OneIssue from "../components/issues/OneIssue";
import axios from "axios";
import {issuesPerPage} from "../configs/configs";
import {useEffect, useState} from "react";
import NoIssues from "../components/issues/NoIssues";
import colors from "../constants/colors";

const Issues = () => {
  const {owner, repo, issues} = useSelector((state: ownRepType) => state);
  const [pageCount, setPageCount] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?page1&per_page=${issuesPerPage}`)
      .then(response => {
        dispatch({
          type: "fetchIssues",
          payload: response.data,
        });
      }).then(() => {
        setPageCount(curr => curr + 1);
        setLoaded(true);
      })
      .catch(err => console.log("getting issues failed."));
  }, []);


  const loadMoreItems = () => {
    axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?page=${pageCount}&per_page=${issuesPerPage}`)
      .then(response => {
        dispatch({
          type: 'fetchExtraIssues',
          payload: response.data,
        });
        setPageCount(curr => curr + 1);
      }).catch(err => console.log(err));
  }

  return (
    <View style={{height: "100%"}}>
      {loaded ?
        <FlatList
          data={issues}
          renderItem={item => <OneIssue item={item}/>}
          keyExtractor={(item: any) => item.id * 100 * Math.random()}
          onEndReached={loadMoreItems}
          ListEmptyComponent={<NoIssues/>}
        /> :
        <ActivityIndicator size="large" color={colors.primary}/>
      }
    </View>
  )
}

export default Issues;
