import {Text, StyleSheet} from "react-native";
import {List} from "react-native-paper";
import {useState} from "react";

const OneIssue = ({item} : {item: any}) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);


  const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const months = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec',
    ]
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${year} ${month} ${day}`;
  }

  return (
    <List.Section style={styles.container}>
      <Text style={styles.title}>{item.item.title}</Text>
      <Text style={styles.userLogin}>
        Issued by: <Text style={{fontWeight: 'bold'}}>{item.item.user.login}</Text>
      </Text>

      <List.Accordion
        title="Issue Body"
        style={styles.bodyAccordion}
        expanded={expanded}
        onPress={handlePress}>
        <Text style={styles.bodyText}>{item.item.body}</Text>
      </List.Accordion>

      <Text style={styles.createdAt}>Created at: {dateFormatter(item.item.created_at)}</Text>
      <Text style={styles.createdAt}>Updated at: {dateFormatter(item.item.updated_at)}</Text>
    </List.Section>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgb(63,63,63)',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'salmon',
  },
  bodyAccordion: {
    padding: 0,
    backgroundColor: 'grey',
    color: 'white',
  },
  bodyText: {
    color: 'white',
  },
  userLogin: {
    alignSelf: "flex-end",
    color: 'dodgerblue',
  },
  createdAt: {
    color: 'grey',
    fontSize: 12,
  },
  updatedAt: {
    color: 'grey',
    fontSize: 12,
  }
})

export default OneIssue;
