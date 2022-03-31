import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Picker,
  TouchableOpacity,
} from "react-native";
import styles from "../../assets/stylesheets";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/actions/sellersAction";
import { AntDesign } from "react-native-vector-icons";
export const HomeHeader = () => {
  const [selectedValue, setSelectedValue] = useState("closed");
  const { token } = useSelector((state) => state.sellersReducer);
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(loginSuccess(null));
  };
  return (
    <View style={styles.homeHeader}>
      <View style={styles.homeHeaderLeft}>
        <View style={styles.openClosedStatus}>
          <Picker
            selectedValue={selectedValue}
            style={styles.StatusDropDown}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="OPEN" value="open" color="green" />
            <Picker.Item label="CLOSED" value="closed" color="red" />
          </Picker>
        </View>
      </View>
      <View style={styles.homeHeaderRight}>
        {/* <TouchableOpacity
          onPress={() => doLogout()}
          style={{
            backgroundColor: "#eee",
            padding: 5,
          }}
        >
          <Text>logout</Text>
        </TouchableOpacity> */}

        {/* <Ionicons
          style={styles.homeHeaderIcons}
          name="bar-chart"
          size={20}
        ></Ionicons> */}
        <Ionicons
          style={styles.homeHeaderIcons}
          name="search"
          size={20}
        ></Ionicons>
        <Ionicons
          style={styles.homeHeaderIcons}
          name="settings"
          size={20}
        ></Ionicons>
        <Pressable>
          <Ionicons
            style={styles.homeHeaderIcons}
            onPress={() => doLogout()}
            name="exit"
            size={20}
          ></Ionicons>
        </Pressable>
      </View>
    </View>
  );
};
