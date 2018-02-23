import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default class SearchInput extends Component {
  render() {
    const { placeholder } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});
