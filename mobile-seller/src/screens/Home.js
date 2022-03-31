import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "../../assets/stylesheets";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../store/actions/ordersAction";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { HomeHeader } from "../components/homeHeader";
import { WaitingTransaction } from "../components/waitingTransaction";

import { updateLocation } from "../store/actions/sellersAction";
import { fetchOrderWaiting } from "../store/actions/ordersWaitingAction";

export const HomeScreen = () => {
  const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";
  const dispatch = useDispatch();
  const { ordersWaiting } = useSelector((state) => state.ordersWaitingReducer);
  const { token, currentSeller } = useSelector((state) => state.sellersReducer);

  TaskManager.defineTask(
    TASK_FETCH_LOCATION,
    async ({ data: { locations }, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      const [location] = locations;
      try {
        dispatch(updateLocation((id = currentSeller._id), location));
      } catch (err) {
        console.error(err, "error loc");
      }
    }
  );

  Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 0, // minimum change (in meters) betweens updates
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
    const interval = setInterval(() => {
      dispatch(fetchOrders({ status: "waiting", token }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.orderContainer}>
        <WaitingTransaction></WaitingTransaction>
      </View>
    </View>
  );
};
