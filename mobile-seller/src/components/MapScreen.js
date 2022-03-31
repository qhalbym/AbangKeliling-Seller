import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Polyline } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const MapScreen = ({ route }) => {
  const { customer, seller } = route.params;
  const getHeight = (param) => {
    return (windowHeight * param) / 100;
  };

  const getWidth = (param) => {
    return (windowWidth * param) / 100;
  };

  const [currentLoc, setCurrentLoc] = useState({
    latitude: 3.582207939138823,
    longitude: 98.59912785501162,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLoc(location.coords);
    })();
  }, []);
  return (
    <View>
      <MapView
        style={{ height: getHeight(90), width: getWidth(90) }}
        region={{
          latitude: seller.latitude,
          longitude: seller.longitude,
          latitudeDelta: 0.0136,
          longitudeDelta: 0.0136,
        }}
      >
        <Polyline
          coordinates={[
            seller,
            {
              latitude: 3.586107939138823,
              longitude: 98.59912785501162,
            },
          ]}
          strokeColor="#8B0000"
          fillColor="#8B0000"
          strokeWidth={3}
        />
        <Marker coordinate={seller}>
          <View style={styles.marker}>
            <Ionicons name="person" size={getHeight(5)}></Ionicons>
            <Text>Seller</Text>
          </View>
        </Marker>
        <Marker
          coordinate={{
            latitude: 3.586107939138823,
            longitude: 98.59912785501162,
          }}
        >
          <View style={styles.marker}>
            <Ionicons name="person" size={getHeight(5)}></Ionicons>
            <Text>Customer</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
  },
});
