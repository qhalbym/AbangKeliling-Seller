import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Linking,
  Button,
  ScrollView,
  Image,
  MapView,
} from "react-native";
import { Marker } from "react-native-maps";
import styles from "../../assets/stylesheets";
import { useDispatch, useSelector } from "react-redux";
import { editOrders, fetchOrders } from "../store/actions/ordersAction";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";

export const OrderCards = ({ route, navigation }) => {
  const [currentLoc, setCurrentLoc] = useState({
    latitude: 3.582207939138823,
    longitude: 98.59912785501162,
  });
  const [markers, setMarkers] = useState({
    seller: {
      latitude: 3.582207939138823,
      longitude: 98.59912785501162,
    },
    customer: {
      latitude: 3.582207939138823,
      longitude: 98.59912785501162,
    },
  });

  const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(2);
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const [showMap, setMapDisplay] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [currentOrder, setCurrent] = useState("");
  const openMap = (location) => {
    const url = Platform.select({
      ios:
        "maps:" +
        location.latitude +
        "," +
        location.longitude +
        "?q=" +
        location.latitude +
        "," +
        location.longitude,
      android:
        "geo:" +
        location.latitude +
        "," +
        location.longitude +
        "?q=" +
        location.latitude +
        "," +
        location.longitude,
    });

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        const browser_url =
          "https://www.google.de/maps/@" +
          location.latitude +
          "," +
          location.longitude +
          "?q=" +
          location.latitude;
        return Linking.openURL(browser_url);
      }
    });
  };
  
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.ordersReducer
  );

  const getMap = (params) => {
    setMarkers(params);
    if (
      !markers.seller.latitude ||
      !markers.seller.longitude ||
      !markers.customer.latitude ||
      !markers.customer.longitude
    ) {
      console.log("masuk kosong");
    } else {
      console.log("masuk ada");
      setMapDisplay(true);
    }
  };

  const screen1 = () => {
    return <Text>screen1</Text>;
  };

  const acceptOrder = (id) => {
    dispatch(editOrders(id, "ongoing")).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    dispatch(fetchOrders({})).catch((err) => {
      console.log(err);
    });
    dispatch(fetchOrders({ status: "ongoing" }))
      .then((result) => {
        if (result.length > 0) {
          setPreparing(true);
        }
        setCurrent(result[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });

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
  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  } else {
    return (
      <View
        style={{
          alignSelf: "flex-start",
          padding: 20,
        }}
      >
        <ScrollView>
          {orders.map((e) => {
            return (
              <View key={e._id} style={styles.cardContainer}>
                <View>
                  <View>
                    <Text>{e.customerName}</Text>
                    <Text>Seller: {e.sellerName}</Text>
                    <Text>
                      Distance:{" "}
                      {getDistance(
                        currentLoc.latitude,
                        currentLoc.longitude,
                        3.589207939138823,
                        98.59112785501162
                      )}{" "}
                      Km
                    </Text>

                    <Text>
                      {/* prettier-ignore */}Location : {/* prettier-ignore */}
                      <Text style={styles.buttonSeeOnMap} onPress={() => {navigation.navigate('Maps', {seller: currentLoc, customer: e.customerLocation})
                      }}
                         >
                         See on Map
                      </Text>
                    </Text>
                    <Text>Status: {e.status}</Text>
                  </View>
                  {}
                  <View>
                    {e._id == currentOrder ? (
                      <Text>Preparing this Order</Text>
                    ) : preparing ? (
                      <Text> </Text>
                    ) : (
                      <Button
                        onPress={() => acceptOrder(e._id)}
                        title="Accept Order"
                      ></Button>
                    )}
                  </View>
                </View>
                <View>
                  <Image
                    source={{
                      uri: "https://fv9-1.failiem.lv/thumb_show.php?i=rdspfbhs7&view",
                    }}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
};
