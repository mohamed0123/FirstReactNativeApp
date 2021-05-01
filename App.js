import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { NativeRouter, Route, Switch, Link } from "react-router-native";
import AppBar from "./components/AppBar";
import DetailesComponent from "./components/DetailesComponent";
import CustomersView from './components/CustomersView';


const App = () => {
  return (
    <NativeRouter>
      <SafeAreaView>
        <Switch>
          <Route exact path="/" component={CustomersView} />
          <Route exact path="/customers" component={CustomersView} />
          <Route exact path="/detailes" component={DetailesComponent} />
        </Switch>
      </SafeAreaView>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});

export default App;
