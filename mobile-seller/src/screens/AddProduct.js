import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { PacmanIndicator } from "react-native-indicators";
import { Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../store/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { addProduct } from "../store/actions/productAction";
import Toast from "react-native-toast-message";

const AddProductScreen = ({ navigation }) => {
  const { token } = useSelector((state) => state.sellersReducer);
  const [image, setImage] = useState(null);
  const [nameForm, setNameForm] = useState("");
  const [temp, setTemp] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setTemp(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const toastAddProductFailed = () => {
    Toast.show({
      type: "error",
      text1: "All Input must be filled",
      visibilityTime: 1500,
    });
  };
  const toastAddProductSuccess = () => {
    Toast.show({
      text1: "Add Product Success",
      visibilityTime: 1500,
    });
  };

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const [inputs, setInputs] = useState({
    name: "",
    price: "",

    description: ""

  });

  const submithandler = async () => {
    let formData = new FormData();
    let img = {
      uri: image,
      name: nameForm + ".jpeg",
      type: "image/jpeg",
    };
    if (!inputs.name || !inputs.price || !inputs.description) {
      return toastAddProductFailed()
    }
    let titleName = toTitleCase(inputs.name)
    console.log(titleName)
    formData.append("name", titleName);
    formData.append("price", inputs.price);
    formData.append("description", inputs.description);
    formData.append("image", img);
    setLoading(true);
    await dispatch(addProduct(token, formData))
    toastAddProductSuccess()
    navigation.navigate("Product")
  }

  if (loading) {
    return (
      <View style={[styles.containerLoading, styles.horizontal]}>
        <PacmanIndicator color="yellow" />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.textHeader}>Add Menu</Text>
      <Text style={styles.text}>Product Name</Text>
      <TextInput
        style={styles.Input}
        placeholder="Name Product"
        onChangeText={(test) => setInputs({ ...inputs, name: toTitleCase(test) })}
      />
      <Text style={styles.text}>Price</Text>
      <TextInput
        style={styles.Input}
        placeholder="Nominal"
        onChangeText={(text) => setInputs({ ...inputs, price: text })}
      />
      <Text style={styles.text}>Description</Text>
      <TextInput
        style={styles.Input}
        placeholder="Info Product"
        onChangeText={(text) => setInputs({ ...inputs, description: text })}
      />
      <Text style={styles.text}>Upload Image </Text>
      <View style={styles.uploadImage}>
        <View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                marginLeft: 30,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
          )}
        </View>
        <View style={styles.CenterContent}>
          <Button
            style={styles.btnUpload}
            mode="contained"
            onPress={() => pickImage()}
          >
            Upload File
          </Button>
        </View>
      </View>
      <Button
        style={styles.btnSubmit}
        mode="contained"
        onPress={() => submithandler()}
      >
        Submit
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    marginLeft: 30,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 30,
  },
  Input: {
    borderBottomWidth: 2,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30,
    borderColor: "skyblue",
    height: 30,
  },
  CenterContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  uploadImage: {
    flexDirection: "row",
  },
  btnUpload: {
    // fontSize: 10,
    marginLeft: 30,
    backgroundColor: "#64748b",
    elevation: 3,
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 10,
    opacity: 0.9,
  },
  btnSubmit: {
    marginVertical: 40,
    marginHorizontal: 90,
    backgroundColor: "#64748b",
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default AddProductScreen;
