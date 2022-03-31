import React from "react";
import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
// import { Button } from "react-native-paper";
import styles from "../../assets/stylesheets";
import { fetchOrders, editOrders } from "../store/actions/ordersAction";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";
import { OpenMapDirections } from "react-native-navigation-directions";
import Toast from "react-native-toast-message";
import { DataTable } from "react-native-paper";
import { Dimensions } from "react-native";
export const WaitingTransaction = () => {
  const [currentLoc, setCurrentLoc] = useState({
    latitude: 3.582207939138823,
    longitude: 98.59912785501162,
  });

  const toastSuccess = () => {
    Toast.show({
      text1: "Status Updated",
      visibilityTime: 1500,
    });
  };

  const { token } = useSelector((state) => state.sellersReducer);

  const acceptOrder = async (id) => {
    try {
      await dispatch(editOrders(id, "ongoing", token));
      await dispatch(fetchOrders({ status: "ongoing", token }));
      toastSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  const getRoute = (coords) => {
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
  const { waiting, loading, error } = useSelector(
    (state) => state.ordersReducer
  );
  useEffect(() => {
    dispatch(fetchOrders({ status: "waiting", token })).catch((err) => {
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
  function currencyFormat(num) {
    const formatedNum = +num;
    return (
      "Rp " + formatedNum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }
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
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const renderItem = ({ item }) => (
    <View style={styles.cardwaiting}>
      <View style={styles.contWaitingSeller}>
        <View style={styles.waitingSeller}>
          <Image
            source={{
              uri: "https://fv9-5.failiem.lv/thumb_show.php?i=9g49yzj2u&view",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Text style={styles.orderDetailText}>{item?.customerName}</Text>
        </View>
        <View>
          <Text style={{ marginRight: 10 }}>
            {timeSince(item.updatedAt)} ago
          </Text>
        </View>
      </View>
      {/* <Text style={styles.orderDetailText}>Orders: </Text> */}
      <View style={styles.orderItems}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title numberOfLines={2}>Product Name</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
          </DataTable.Header>
          {Array.isArray(item?.ProductId) ? (
            item?.ProductId.map((e, idx) => (
              <DataTable.Row>
                <DataTable.Cell>
                  {/* {e.name} */}
                  <Text style={{ fontSize: 8 }}>{e.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={{ marginRight: 20 }}>
                  {/* {e.quantity} */}
                  <Text style={{ fontSize: 8, marginRight: 80 }}>
                    {e.quantity}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {/* {currencyFormat(e.price)} */}
                  <Text style={{ fontSize: 8 }}>{currencyFormat(e.price)}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <Text style={styles.orderDetailText}>
              {item?.ProductId.name} x {item?.ProductId.quantity}
            </Text>
          )}
        </DataTable>
      </View>
      <View style={styles.navigateMapButton}>
        <TouchableOpacity>
          <Text style={styles.btnCancel}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.btnAccept}
            onPress={() => acceptOrder(item._id, "ongoing")}
          >
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!waiting[0]) {
    return (
      <View style={styles.onGoingContainer}>
        <Image
          style={styles.imageNoOrder}
          source={{
            uri: "https://fv9-5.failiem.lv/thumb_show.php?i=8b7w8a8rk&view",
          }}
        />
      </View>
    );
  } else {
    return (
      <FlatList
        renderItem={renderItem}
        data={waiting}
        keyExtractor={(item) => item._id}
      >
        {" "}
      </FlatList>
    );
  }
};
