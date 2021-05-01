import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { path } from "../utiles/MyConstatnts";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import AppBar from "./AppBar";
import * as FileSystem from "expo-file-system";
const Separator = () => <View style={styles.separator} />;
const CardItem = ({ item }) => {
  return (
    <Card>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Content>
        <Title>{item.type}</Title>
        <Paragraph>{item.macAddress}</Paragraph>
        <Paragraph>{item.ipAddress}</Paragraph>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
    </Card>
  );
};

export default function DetailesComponent({ history, location }) {
  const [macAddress, setMacAddress] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [type, setType] = useState("");
  const [itemData, setItemData] = useState([]);
  
  // const LeftContent = props => <Avatar.Icon {...props} icon="camera" />
  useEffect(() => {
    setItemData([...location.state.currentItem.itemData]);
  }, []);

  const addMacIpItem = async () => {
    if (macAddress.length > 0 && ipAddress.length > 0 && type.length > 0) {
      try {
        const newItem = {
          id: Date.now().toString(),
          macAddress,
          ipAddress,
          type,
        };
        setItemData([...itemData, newItem]);
        let allData = location.state.allData;
        allData = allData.map((e) => {
          if (e.id === location.state.currentItem.id) {
            e.itemData = [...itemData, newItem];
          }
          return e;
        });
        
        const dataToSave = JSON.stringify(allData);
        console.log(dataToSave)
        await FileSystem.writeAsStringAsync(path, dataToSave);
      } catch (e) {
        console.log(e);
      }
      setMacAddress("");
      setIpAddress("");
      setType("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.appBar}
          onPress={() =>
            history.push("/customers")
          }
        >
          {/* <Image
            style={styles.image}
            source={{
              uri: "https://image.flaticon.com/icons/png/128/52/52045.png",
            }}
          /> */}
          <Text style={styles.heading}>{location.state.currentItem.name}</Text>
        </TouchableOpacity>
        {/* <View style={styles.appBar}>
          <Text style={styles.heading}>{location.state.currentItem.name}</Text>
          </View> */}
      </View>

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

      <TouchableOpacity style={styles.button} onPress={() => addMacIpItem()}>
        <Text>Add</Text>
      </TouchableOpacity>

      <Separator />

      <FlatList
        data={itemData}
        renderItem={CardItem}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 2,
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
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CBCDCB",
    width: "50%",
    marginLeft: "25%",
    padding: 10,
    borderRadius: 10,
  },
  appBar: {
    backgroundColor: "#04976B",
    color: "white",
    width: "100%",
    // height:"30%",
    // zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "white",
    fontSize: 24,
    fontWeight: "400",
    justifyContent: "center",
    alignItems: "center",
    // height:"40%"
    // zIndex: 1
  },
  image: {
    width: "10%",
  },
  buttonBack: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // justifyContent: "left",
    backgroundColor: "#CBCDCB",
    // width: "50%",
    marginRight: "90%",
    // height:"0%",
    // zIndex: 1,
    padding: 0,
    borderRadius: 0,
    height: 0,
  },
});
