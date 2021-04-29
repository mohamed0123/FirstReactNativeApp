import React, { useState } from "react";
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
import AppBar from "./components/AppBar";
// import { v4 as uuidv4 } from 'uuid';

import usersData from "./assets/data.json";
// const fs = require('fs');
import * as FileSystem from "expo-file-system";
// const { StorageAccessFramework } = FileSystem;

// import * as RNFS from "react-native-fs";

// const filePath = RNFS.DocumentDirectoryPath + "/kimoUsersData.json";
const path = FileSystem.documentDirectory + "kimo_customers.json";
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const App = () => {
  // const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  // if (permissions.granted) {
  //   // Gets SAF URI from response
  //   const uri = permissions.directoryUri;

  //   // Gets all files inside of selected directory
  //   const files = await StorageAccessFramework.readDirectoryAsync(uri);
  //   // alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
  // }
  // const albumUri = StorageAccessFramework.getUriForDirectoryInRoot("kimo");

  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");

  // content = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

  const [data, setData] = useState(usersData);
  const loadData = async () => {
    try {
      let dataToLoad = "[]";
      // console.log(path);
      dataToLoad = await FileSystem.readAsStringAsync(path);
      // console.log("dataToLoad >>> ");
      // console.log(dataToLoad);
      if (dataToLoad && dataToLoad.length > 0) {
        // console.log(dataToLoad);
        const previousData = JSON.parse(dataToLoad) || [];
        setData([...previousData]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  loadData()

  // RNFS.readFile(filePath, "ascii")
  //   .then((res) => {
  //     setData([...JSON.parse(res), { id: Date.now(), name: title }]);
  //   })
  //   .catch((err) => {
  //     console.log(err.message, err.code);
  //   });

  const addItem = async () => {
    if (title.length > 0) {
      // Add todo to the list
      // const uuid = uuidv4();

      // setData([...data, { id: Date.now().toString(), name: title }]);
      // FileSystem.writeAsStringAsync("data.json", data);
      
      try {
        const dataToSave = JSON.stringify([...data, { id: Date.now().toString(), name: title }]);
        await FileSystem.writeAsStringAsync(path, dataToSave);
      } catch (e) {
        console.log(e);
      }
      // console.log(result);
      // fs.writeFileSync('./assets/data.json' , data)
      // clear the value of the textfield
      // RNFS.writeFile(filePath, JSON.stringify(data), "utf8")
      //   .then((success) => {
      //     alert('success')
      //   })
      //   .catch((err) => {
      //     console.log(err.message);
      //     alert(err.message)
      //   });
      setTitle("");
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#5298C1" : "#C0C2C9";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <View style={styles.todo}>
        <TextInput
          placeholder="Add a Customer"
          value={title}
          onChangeText={(value) => setTitle(value)}
          style={styles.textbox}
        />
        <Button title="Add" color="#7F39FB" onPress={() => addItem()} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 1,
    //marginHorizontal: 16,
    borderRadius: 15,
  },
  title: {
    fontSize: 32,
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
});

export default App;
