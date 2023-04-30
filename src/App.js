import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <View className="App">
      <Home/>
    </View>
  );
};

export default withAuthenticator(App);
