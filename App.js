import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";

import SearchInput from "./components/SearchInput";
import { unsplash } from "./utils/api";
import ImageLoad from "react-native-image-placeholder";

export default class App extends React.Component {
  state = {
    photo: null
  };

  componentDidMount() {
    this.getPhotoByCity("san francisco", 1);
  }

  getPhotoByCity(city, numPage) {
    unsplash.search
      .photos(city, numPage)
      .then(response => response.json())
      .then(json => {
        this.setState({
          photo: json.results[0]
        });
        console.log(this.state.photo);
      });
  }

  render() {
    if (!this.state.photo) {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <ImageBackground
            source="https://duranvirginia.files.wordpress.com/2014/02/virginia-duran-blog-10-sites-to-take-the-best-skyline-pictures-in-san-francisco-mandarin-oriental-at-dusk.jpg"
            style={styles.imageContainer}
            imageStyle={styles.image}
          >
            <View style={styles.detailsContainer}>
              <Text style={[styles.largeText, styles.textStyle]}>
                San Francisco
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
                Light Cloud2
              </Text>
              <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
              <SearchInput placeholder="Search any city" />
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      );
    }
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground
          source={this.state.photo.urls.full}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>
              San Francisco
            </Text>
            <Text style={[styles.smallText, styles.textStyle]}>
              Light Cloud2
            </Text>
            <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
            <SearchInput placeholder="Search any city" />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E"
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});
