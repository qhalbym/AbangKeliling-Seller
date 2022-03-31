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
import { CompleteTransaction } from "../components/completeTransaction";

export const TransactionPage = () => {
  const TASK_FETCH_LOCATION = "TASK_FETCH_LOCATION";
  const dispatch = useDispatch();
  const { ordersWaiting } = useSelector((state) => state.ordersWaitingReducer);
  const { token, currentSeller } = useSelector((state) => state.sellersReducer);

  useEffect(() => {
    dispatch(fetchOrders({ status: "complete", token }));
  }, []);

  return (
    <View style={styles.containerHistory}>
      <Text style={{
        fontSize: 30,
        marginTop: 60,
        fontWeight: 'bold',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        textAlign: "center"
      }}>      Order History      </Text>
      <Text style={{
        borderBottomColor: 'black',
        borderBottomWidth: 2
      }}>                                                   </Text>
      <View style={styles.orderContainer}>
        <CompleteTransaction></CompleteTransaction>
      </View>
    </View>
  );
};
