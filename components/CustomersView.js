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
import { path } from "../utiles/MyConstatnts";
import * as FileSystem from "expo-file-system";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);
export default function CustomersView(props) {
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const loadData = async () => {
    try {
      let dataToLoad = "[]";
      dataToLoad = await FileSystem.readAsStringAsync(path);
      if (dataToLoad && dataToLoad.length > 0) {
        const previousData = JSON.parse(dataToLoad) || [];
        setData([...previousData]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = async () => {
    if (title.length > 0) {
      try {
        const newItem = { id: Date.now().toString(), name: title };
        setData([...data, newItem]);
        const dataToSave = JSON.stringify([...data, newItem]);
        await FileSystem.writeAsStringAsync(path, dataToSave);
      } catch (e) {
        console.log(e);
      }
      setTitle("");
    }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#CBCDCB" : "#141514";
    const color = item.id === selectedId ? "black" : "white";

    return (
      <Item
        item={item}
        onPress={() => navigateToDetailesComponents(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const navigateToDetailesComponents = ({ history, item }) => {
    setSelectedId(item.id);
  };

  return (
    <SafeAreaView style={styles.marginBtooem}>
      <AppBar title="Kimo Customers" />
      <View style={styles.todo}>
        <TextInput
          placeholder="Add a Customer"
          value={title}
          onChangeText={(value) => setTitle(value)}
          style={styles.textbox}
        />
        <Button
          borderRadius="50%"
          padding="0"
          title="Add"
          color="#D75921"
          onPress={() => addItem()}
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

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
  btn: {
    borderWidth: 1,
    borderColor: "#D75921",
    borderRadius: 50,
    padding: 2,
    margin: 2,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  marginBtooem: {
    marginBottom: "35%",
  },
});
