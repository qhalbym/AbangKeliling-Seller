import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import TabNav from "./src/components/tabNav";
import store from "./src/store/index";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <Provider store={store}>
      <TabNav />
      <Toast />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
