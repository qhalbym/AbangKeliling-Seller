import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { sellerRegister } from "../store/actions/sellersAction";
import styles from "../../assets/stylesheets";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useEffect } from "react";
import { fetchCategories } from "../store/actions/categoryAction";


export const RegisterScreen = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const { categories } = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const [dataRegister, setDataRegister] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    storeName: "",
    storeDescription: "",
    categoryId: ""
  });
  function signUpButton() {
    if (!dataRegister.username.trim() || !dataRegister.email.trim() || !dataRegister.password.trim() || !dataRegister.phoneNumber.trim() || !dataRegister.storeName.trim() || !dataRegister.storeDescription.trim()) {
      alert('Field Can not be Empty!');
      return;
    }
    dispatch(sellerRegister(dataRegister));

  }
  console.log(categories);
  const dataCategories = categories.map((el) => {
    return { label: el.name, value: el._id };
  });
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeading}>

        <Text style={styles.authTitle}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>

        <TextInput
          style={styles.authInputForm}
          onChangeText={(text) => setDataRegister({ ...dataRegister, username: text })}
          placeholder={'Username'}

        />
        <TextInput
          style={styles.authInputForm}
          onChangeText={(text) => setDataRegister({ ...dataRegister, phoneNumber: text })}
          placeholder={'Phone Number'}

        />
        <TextInput
          style={styles.authInputForm}
          onChangeText={(text) => setDataRegister({ ...dataRegister, storeName: text })}
          placeholder={'Store Name'}

        />
        <TextInput
          style={styles.authInputForm}
          onChangeText={(text) => setDataRegister({ ...dataRegister, storeDescription: text })}
          placeholder={'Store Description'}

        />
        <TextInput
          style={styles.authInputForm}
          onChangeText={(text) => setDataRegister({ ...dataRegister, email: text })}
          placeholder={'email'}

        />
        <TextInput
          style={styles.authInputForm}
          onChangeText={(text) => setDataRegister({ ...dataRegister, password: text })}
          placeholder={'Password'}
          secureTextEntry={true}

        />
      </View>

      <View style={styles.containerDropDown}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}

          iconStyle={styles.iconStyle}
          data={dataCategories}

          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select Category" : "..."}

          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setDataRegister({ ...dataRegister, categoryId: item.value });
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>

      <View style={styles.authButton}>
        <Button
          style={styles.authButton}
          title={'Sign Up'}
          onPress={() => signUpButton()}
        />
      </View>
    </View>
  );
};

