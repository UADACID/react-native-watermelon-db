import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Database } from "@nozbe/watermelondb";

import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import Post from "./src/model/post";
import { mySchema } from "./src/model/schema";

// Screens
import TodoListContainer from "./src/screens/TodoList";

const adapter = new SQLiteAdapter({
  dbName: "WDB",
  schema: mySchema
});

const databases = new Database({
  adapter,
  modelClasses: [Post],
  actionsEnabled: true
});

const AppNavigator = createStackNavigator({
  TodoListContainer: {
    screen: TodoListContainer
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <DatabaseProvider database={databases}>
        <AppContainer />
      </DatabaseProvider>
    );
  }
}
