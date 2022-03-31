// import React from "react";
import { View, Text, FlatList, Button, Image, Pressable } from "react-native";
import styles from "../../assets/stylesheets";
import React, { useState, useEffect } from "react";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";
import { fetchProducts } from "../store/actions/productAction";
const BASE_URL = `https://d63b-2001-448a-2020-3371-368-cb15-82e6-ae01.ngrok.io`;
const ProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.sellersReducer);
  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchProducts(token));
  }, []);
  if (!products) {
    return (
      <View style={styles.container}>
        <Text>loading</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <CardProduct item={item} navigation={navigation} />
  );
  const handleAdd = () => {
    console.log("kepnggil ga");
    navigation.navigate("AddProduct");
  };
  return (
    <View style={styles.container}>
      <View style={styles.addProduk}>
        <View style={styles.addProdukTitle}>
          <Text style={styles.headerListProduct}>List Product</Text>
        </View>
        <View>
          <Pressable onPress={handleAdd}>
            <AntDesign name={"pluscircle"} color={"#38bdf8"} size={30} />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
export default ProductScreen;
