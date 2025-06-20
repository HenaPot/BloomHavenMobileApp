import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import RootStackNav from "@/navigation/RootStackNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <RootStackNav />
    </Provider>
  );
}