import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CardProduct = ({ item, navigation }) => {
  const onPress = (id) => {
    navigation.navigate("UpdateProduct", id);
  };
  function currencyFormat(num) {
    const formatedNum = +num;
    return (
      "Rp " + formatedNum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }

  function titleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  return (
    <TouchableOpacity onPress={() => onPress(item._id)}>
      <View style={styles.cardProduct}>
        <View style={styles.containerImg}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: item.image,
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.contentName}>{titleCase(item.name)}</Text>
          <Text style={styles.contentDesc}>{item.description}</Text>
          <Text style={styles.contentPrice}>{currencyFormat(item.price)}</Text>
        </View>
        {/* <View>
          <Image
            style={styles.imageDelete}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCdxrqy0eWktIi-Um2x6Lj1ZyFtcI_M6SvSw&usqp=CAU",
            }}
            onPress={() => handleDelete(item._id)}
          />
        </View> */}
      </View>
    </TouchableOpacity>
  );
};
const deviceWidht = Math.round(Dimensions.get("window").width);
const radius = 20;
const styles = StyleSheet.create({
  cardProduct: {
    flexDirection: "row",
    width: deviceWidht - 25,
    height: 100,
    marginTop: 10,
    borderBottomWidth: 1,
    alignItems: "center",
    // justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  containerImg: {
    marginLeft: 10,
  },
  contentDesc: {
    color: "#9ca3af",
    marginBottom: 3,
    marginTop: 3,
  },
  contentPrice: {
    color: "#0f172a",
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 10,
    opacity: 0.9,
  },
  content: {
    marginLeft: 20,
  },
  contentName: {
    fontWeight: "bold",
  },
  // imageDelete: {
  //   height: 20,
  //   width: 20,
  //   borderRadius: 10,
  //   opacity: 0.9,
  // },
});
export default CardProduct;
