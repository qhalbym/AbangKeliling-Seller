import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Linking, Button, Image } from "react-native";
import styles from "../../assets/stylesheets";
import { fetchOrders } from "../store/actions/ordersAction";
import * as Location from "expo-location";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { OpenMapDirections } from "react-native-navigation-directions";

export const OnGoingTransaction = () => {
  const [currentLoc, setCurrentLoc] = useState({
    latitude: 3.582207939138823,
    longitude: 98.59912785501162,
  });

  const { token } = useSelector((state) => state.sellersReducer);


  const toastSuccess = () => {
    Toast.show({
      text1: "Status Updated",
      visibilityTime: 1500,
    });
  };

  const completeOrder = async (id) => {
    try {
      await dispatch(editOrders(id, "complete", token));
      await dispatch(fetchOrders({ status: "complete", token }));
      await dispatch(fetchOrders({ status: "ongoing", token }));
      toastSuccess();
    } catch (err) {
      console.log(err);
    }
  };
  const getRoute = (coords) => {
    console.log(coords, "======inicoords");

    const startPoint = {
      latitude: coords.seller.latitude,
      longitude: coords.seller.longitude,
    };
    const endPoint = {
      latitude: coords.customer.latitude,
      longitude: coords.customer.longitude,
    };
    const transportPlan = "d";
    OpenMapDirections(startPoint, endPoint, transportPlan).then((result) => {
      console.log(result);
    });
  };
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
  const { ongoing, loading, error } = useSelector(
    (state) => state.ordersReducer
  );
  useEffect(() => {
    dispatch(fetchOrders({ status: "ongoing", token })).catch((err) => {
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
  const DURATION_IN_SECONDS = {
    epochs: ["year", "month", "day", "hour", "minute"],
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  function getDuration(seconds) {
    let epoch, interval;

    for (let i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
      epoch = DURATION_IN_SECONDS.epochs[i];
      interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
      if (interval >= 1) {
        return {
          interval: interval,
          epoch: epoch,
        };
      }
    }
  }

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const duration = getDuration(seconds);
    const suffix = duration.interval > 1 || duration.interval === 0 ? "s" : "";
    return duration.interval + " " + duration.epoch + suffix;
  }

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#00ff00" />;
  // } else 
  if (!ongoing[0]) {
    return (
      <View style={styles.onGoingContainer}>
        <Text>No Order</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.onGoingContainer}>
        <View style={styles.contWaitingSeller}>
          <View style={styles.waitingSeller}>
            <Image
              source={{
                uri: "https://fv9-5.failiem.lv/thumb_show.php?i=9g49yzj2u&view",
              }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.orderDetailText}>
              {ongoing[0]?.customerName}
            </Text>
          </View>
          <View>
            <Text style={{ marginRight: 10 }}>
              {timeSince(ongoing[0]?.updatedAt)} ago
            </Text>
          </View>
        </View>
        <View style={styles.orderItemsOnGoing}>
          {Array.isArray(ongoing[0]?.ProductId) ? (
            ongoing[0]?.ProductId.map((e, idx) => (
              <Text key={idx} style={styles.orderDetailText}>
                {e.quantity} x {e.name}
              </Text>
            ))
          ) : (
            <Text style={styles.orderDetailText}>
              {ongoing[0]?.ProductId.quantity} x {ongoing[0]?.ProductId.name}
            </Text>
          )}
        </View>
        <View style={styles.navigateMapButton}>
          <Button

            title="Complete Order"
            onPress={() => completeOrder(ongoing[0]._id)}
          ></Button>
          <Button

            title="Navigate"
            onPress={() =>
              getRoute({
                seller: currentLoc,
                customer: ongoing[0].customerLocation,
              })
            }
          ></Button>
        </View>
      </View>
    );
  }
};
