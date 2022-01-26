import {View, StyleSheet, FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {ownRepType} from "../store";
import OneIssue from "../components/issues/OneIssue";
import axios from "axios";
import {issuesPepPage} from "../configs/configs";
import {useState} from "react";
import NoIssues from "../components/issues/NoIssues";

const Issues = () => {
  const {owner, repo, issues} = useSelector((state: ownRepType) => state);
  const [pageCount, setPageCount] = useState(2);
  const dispatch = useDispatch();

  const loadMoreItems = () => {
    axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?page=${pageCount}&per_page=${issuesPepPage}`)
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
      <FlatList
        data={issues}
        renderItem={item => <OneIssue item={item}/>}
        keyExtractor={item => item.id * 100 * Math.random()}
        onEndReached={loadMoreItems}
        ListEmptyComponent={<NoIssues/>}
      />
    </View>
  )
}

export default Issues;
