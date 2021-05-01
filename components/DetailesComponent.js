import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AppBar from "./AppBar";
const Separator = () => <View style={styles.separator} />;
export default function DetailesComponent({ history, location }) {
  const [macAddress, setMacAddress] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("");
  const LeftContent = props => <Avatar.Icon {...props} icon="camera" />

  const CardItem = () => {
  

    return (
      <Card>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title={location.state.currentItem.name} />
      <View style={styles.todo}>
        <TextInput
          placeholder="Mac"
          value={macAddress}
          onChangeText={(value) => setMacAddress(value)}
          style={styles.textbox}
        />
      </View>
      <View style={styles.todo}>
        <TextInput
          placeholder="IP"
          value={ipAddress}
          onChangeText={(value) => setIpAddress(value)}
          style={styles.textbox}
        />
      </View>

      <View style={styles.todo}>
        <TextInput
          placeholder="Type"
          value={type}
          onChangeText={(value) => setType(value)}
          style={styles.textbox}
        />
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => addMacIpItem()}
      >
        <Text>Add</Text>
      </TouchableOpacity>
    

      <Separator />

      <CardItem></CardItem>
      <CardItem></CardItem>
      
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
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#CBCDCB",
    width:"50%",
    marginLeft:"25%",
    padding: 10,
    borderRadius:10
  },
});
