import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AppBar(props){
  return (
    <View style={styles.appBar}>
      <Text style={styles.heading}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#04976B",
    color: "white",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    color: "white",
    fontSize: 24,
    fontWeight: "400"
  }
});
