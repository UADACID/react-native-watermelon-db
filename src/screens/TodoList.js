import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import withObservables from "@nozbe/with-observables";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { ScrollView } from "react-native-gesture-handler";

const TodoList = props => {
  const [text, setText] = useState("");

  const actionTambah = async () => {
    if (text === "") {
      return;
    }
    await props.database.action(async () => {
      await props.database.collections.get("posts").create(post => {
        post.title = "New post";
        post.body = text;
      });
      setText("");
    });
  };

  const actionHapus = post => async () => {
    await props.database.action(async () => {
      await post.destroyPermanently();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={value => setText(value)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={actionTambah}>
          <Text style={styles.textButton}>Tambahkan</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        <ScrollView>
          {props.posts.map((post, i) => (
            <View key={i} style={styles.todoItem}>
              <Text>{post.body}</Text>
              <Text onPress={actionHapus(post)}>hapus</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const TodoListContainer = withDatabase(
  withObservables([], ({ database }) => ({
    posts: database.collections
      .get("posts")
      .query()
      .observe()
  }))(TodoList)
);

export default TodoListContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerInput: {
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    margin: 5,
    paddingHorizontal: 10,
    borderColor: "gray"
  },
  buttonAdd: {
    margin: 10,
    padding: 10,
    backgroundColor: "#00bfff",
    borderRadius: 2
  },
  textButton: {
    color: "white"
  },
  containerList: {
    margin: 5
  },
  todoItem: {
    margin: 2,
    padding: 10,
    backgroundColor: "#ffe6e6",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
