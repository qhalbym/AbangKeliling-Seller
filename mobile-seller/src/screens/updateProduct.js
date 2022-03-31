import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { PacmanIndicator } from "react-native-indicators";
import React, { useState, useEffect } from "react";
import { Avatar, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, deleteProduct } from "../store/actions/productAction";
import { fetchProductsDetail } from "../store/actions/productAction";
import Toast from "react-native-toast-message";

export const ProductUpdate = ({ route, navigation }) => {
  const id = route.params;
  const { token } = useSelector((state) => state.sellersReducer);
  const { product } = useSelector((state) => state.productReducer);
  const [nameForm, setNameForm] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsDetail(token, id)).then((data) => {
      setImage(data.image);
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const toastEditProductSuccess = () => {
    Toast.show({
      text1: "Edit Product Success",
      visibilityTime: 1500,
    });
  };

  const toastEditProductFailed = () => {
    Toast.show({
      type: "error",
      text1: "All Input must be filled",
      visibilityTime: 1500,
    });
  };


  const submithandler = async () => {
    let formData = new FormData();
    let img = {
      uri: image,
      name: nameForm + ".jpeg",
      type: "image/jpeg",
    };

    if (!product.name || !product.price || !product.description) {
      return toastEditProductFailed()
    }
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", img);
    setLoading(true);
    dispatch(updateProduct(token, formData, id)).then(() => {
      toastEditProductSuccess()
      navigation.navigate("Product");
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(token, id)).then(() =>
      navigation.navigate("Product")
    );
  };

  if (loading) {
    return (
      <View style={[styles.containerLoading, styles.horizontal]}>
        <PacmanIndicator color="yellow" />
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.textHeader}>Detail Menu</Text>
      <Text style={styles.text}>Product Name</Text>
      <TextInput
        style={styles.Input}
        placeholder="Name Product"
        value={product.name}
        onChangeText={(test) => setProduct({ ...product, name: test })}
      />
      <Text style={styles.text}>Price</Text>
      <TextInput
        style={styles.Input}
        placeholder="Nominal"
        value={product.price}
        onChangeText={(text) => setProduct({ ...product, price: text })}
      />
      <Text style={styles.text}>Description</Text>
      <TextInput
        style={styles.Input}
        placeholder="Info Product"
        value={product.description}
        onChangeText={(text) => setProduct({ ...product, description: text })}
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
            title={"Select Image"}
          >
            Upload File
          </Button>
        </View>
      </View>
      <View style={styles.containerBtn}>
        <Button
          style={styles.btnSubmit}
          mode="contained"
          onPress={submithandler}
          title={"Submit"}
        >
          Submit
        </Button>
        <Button
          style={styles.btnDelete}
          mode="contained"
          onPress={() => handleDelete(product._id)}
          title={"Delete"}
        >
          Delete
        </Button>
      </View>
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
    fontSize: 10,
    marginLeft: 40,
    backgroundColor: "#64748b",
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 10,
    opacity: 0.9,
  },
  btnSubmit: {
    marginVertical: 30,
    marginHorizontal: 30,
    backgroundColor: "#64748b",
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnDelete: {
    backgroundColor: "#ef4444",
    marginHorizontal: 30,
    marginVertical: 30,
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
