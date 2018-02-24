import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from "react-native";

import SearchInput from "./components/SearchInput";
import { unsplash, fetchLocationId, fetchWeather, getIcon } from "./utils/api";
import ImageLoad from "react-native-image-placeholder";

export default class App extends React.Component {
  state = {
    loading: false,
    error: false,
    photo: [],
    location: "Los Angeles",
    temperature: 0,
    weather: "",
    weather_abbr: ""
  };

  componentDidMount() {
    this.getPhotoByCity(this.state.location, 1);
  }

  getPhotoByCity(city, numPage) {
    unsplash.search
      .photos(city, numPage)
      .then(response => response.json())
      .then(json => {
        this.setState({
          photo: json.results
        });
      });
  }

  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const data = await fetchWeather(locationId);
        const { title, consolidated_weather } = data;
        const {
          weather_state_name,
          the_temp,
          weather_state_abbr
        } = consolidated_weather[0];

        this.getPhotoByCity(title, 1);

        this.setState({
          loading: false,
          error: false,
          location: title,
          weather: weather_state_name,
          temperature: the_temp,
          weather_abbr: weather_state_abbr
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  };

  render() {
    const {
      location,
      loading,
      error,
      weather,
      weather_abbr,
      temperature
    } = this.state;

    if (!this.state.photo.length > 0) {
      return null;
    } else {
      return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar barStyle="light-content" />
          <ImageBackground
            source={{ uri: this.state.photo[0].urls.full }}
            style={styles.imageContainer}
            imageStyle={styles.image}
          >
            <View style={styles.detailsContainer}>
              <ActivityIndicator
                animating={loading}
                color="white"
                size="large"
              />
              {!loading && (
                <View>
                  {error && (
                    <Text style={[styles.smallText, styles.textStyle]}>
                      Could not load weather, please try a different city.
                    </Text>
                  )}

                  {!error && (
                    <View>
                      <Text style={[styles.largeText, styles.textStyle]}>
                        {location}
                      </Text>
                      <Text style={[styles.smallText, styles.textStyle]}>
                        {weather}
                      </Text>

                      {temperature === 0 ? null : (
                        <Text
                          style={[styles.largeText, styles.textStyle]}
                        >{`${Math.round(temperature)}°`}</Text>
                      )}
                    </View>
                  )}
                  <SearchInput
                    placeholder="Search any city"
                    onSubmit={this.handleUpdateLocation}
                  />
                </View>
              )}
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      );
    }
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
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  icon: {
    width: 50,
    height: 50
  }
});
