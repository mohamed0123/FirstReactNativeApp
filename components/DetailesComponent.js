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
import AppBar from "./AppBar";
const Separator = () => <View style={styles.separator} />;
export default function DetailesComponent({history , location}){
  const [macAddress, setMacAddress] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  return  ( <SafeAreaView style={styles.container}>
  <AppBar title={location.state.name} />
  <View style={styles.todo}>
    <TextInput
      placeholder="Add a Mac/IP"
      value={macAddress}
      onChangeText={(value) => setTitle(value)}
      style={styles.textbox}
    />
    <TextInput
      placeholder="Add a Mac/IP"
      value={ipAddress}
      onChangeText={(value) => setTitle(value)}
      style={styles.textbox}
    />
    <Button title="Add" color="#7F39FB" onPress={() => addMacIpItem()} />
  </View>
  <Separator />
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  todo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textbox: {
    borderWidth: 1,
    borderColor: "#7F39FB",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: "80%",
  }
});
