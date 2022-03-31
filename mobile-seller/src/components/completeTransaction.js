import React from "react";
import { useEffect, useState } from "react";
import { FlatList, View, Text, Image } from "react-native";
// import { Button } from "react-native-paper";
import styles from "../../assets/stylesheets";
import { fetchOrders, editOrders } from "../store/actions/ordersAction";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";

export const CompleteTransaction = () => {
  const { token } = useSelector((state) => state.sellersReducer);

  const dispatch = useDispatch();
  const { complete, loading, error } = useSelector(
    (state) => state.ordersReducer
  );
  useEffect(() => {
    dispatch(fetchOrders({ status: "complete", token })).catch((err) => {
      console.log(err);
    });
  }, []);

  function currencyFormat(num) {
    const formatedNum = +num;
    return (
      "Rp " + formatedNum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }

  const renderItem = ({ item }) => {
    let totalPrice = 0;

    item.ProductId.forEach((el) => (totalPrice += el.price * el.quantity));

    return (
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
              {item.updatedAt.split("T").slice(0, -1)}
            </Text>
          </View>
        </View>
        <View style={styles.orderItemsComplete}>
          <View>
            <Text>{currencyFormat(totalPrice)}</Text>
          </View>
          <View>
            <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
              COMPLETE
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (!complete[0]) {
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
        data={complete}
        keyExtractor={(item) => item._id}
      >
        {" "}
      </FlatList>
    );
  }
};
