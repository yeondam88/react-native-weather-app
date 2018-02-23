import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default class SearchInput extends Component {
  state = {
    text: ""
  };

  handleChangeText = text => {
    this.setState({
      text
    });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmit(text);
    this.setState({ text: "" });
    console.log(this.state.text);
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
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
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});
