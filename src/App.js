import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import Article from "./pages/Articles/Article";
import Home from "./pages/Home/Home";
import UsefulLinks from "./pages/UsefulLinks/UsefulLinks";
import RolesManagement from "./pages/RolesManagement/RolesManagement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./navBar/Navbar";
import logo from "./logo.svg";

const App = ({signOut}) => {
  return (
    <View className="App">
      <Router>
        <div>
          <NavigationBar />
            {/* <Card>
              <Image src={logo} className="App-logo" alt="logo" />
              <Heading level={1}>We now have Auth!</Heading>
            </Card> */}
          <Button onClick={signOut}>Sign Out</Button>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/article" element={(<Article />)} />
            <Route path="/usefulLinks" element={<UsefulLinks />} />
            <Route path="/rolesManagement" element={<RolesManagement />} />
          </Routes>
        </div>
      </Router>
    </View>
  );
};

export default withAuthenticator(App);
