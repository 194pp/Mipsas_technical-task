import MyCard from "../global/MyCard";
import {Text} from "react-native";

const NoIssues = () => {
  return (
    <MyCard>
      <Text style={{color: 'white', fontWeight: 'bold'}}>No issues found.</Text>
    </MyCard>
  )
}

export default NoIssues;
