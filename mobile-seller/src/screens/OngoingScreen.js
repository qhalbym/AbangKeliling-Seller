import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "../../assets/stylesheets";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../store/actions/ordersAction";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { HomeHeader } from "../components/homeHeader";
import { OnGoingTransaction } from "../components/onGoingTransaction";

import { updateLocation } from "../store/actions/sellersAction";
import { fetchOrderWaiting } from "../store/actions/ordersWaitingAction";

export const OngoingScreen = () => {
  const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";
  const dispatch = useDispatch();
  const { ordersWaiting } = useSelector((state) => state.ordersWaitingReducer);
  const { token } = useSelector((state) => state.sellersReducer);

  TaskManager.defineTask(
    TASK_FETCH_LOCATION,
    async ({ data: { locations }, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      const [location] = locations;
      try {
        dispatch(updateLocation((id = "62331d4568e5b1c829de5991"), location));
      } catch (err) {
        console.error(err, "error loc");
      }
    }
  );

  Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 1, // minimum change (in meters) betweens updates
    deferredUpdatesInterval: 100, // minimum interval (in milliseconds) between updates
    // foregroundService is how you get the task to be updated as often as would be if the app was open
    timeInterval: 100,
    foregroundService: {
      notificationTitle: "Using your location",
      notificationBody:
        "To turn off, go back to the app and switch something off.",
    },
  });

  useEffect(() => {
    dispatch(fetchOrders({ status: "ongoing", token }));
    // const interval = setInterval(() => {
    //   console.log("di run lagi");
    // }, 100000);
    // return () => clearInterval(interval);
  }, []);

  // console.log(ordersWaiting, "<<<<<< order waiting");

  return (
    <View style={styles.containerOngoing}>
      <Text style={{
        fontSize: 30,
        marginTop: 60,
        marginBottom: 100,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        textAlign: "center"
      }}>Ongoing Order</Text>

      <OnGoingTransaction></OnGoingTransaction>
    </View>
  );
};
