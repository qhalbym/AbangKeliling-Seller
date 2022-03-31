import { View, Text, TextInput, Button, Image } from "react-native";
import styles from "../../assets/stylesheets";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { sellerLogin } from "../store/actions/sellersAction";

export const AuthPage = ({ route }) => {
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  function signInButton() {
    if (!dataLogin.email.trim() || !dataLogin.password.trim().trim()) {
      alert("Field Can not be Empty!");
      return;
    }
    dispatch(sellerLogin(dataLogin));
  }

  return (
    <View style={styles.authContainer}>
      <View style={styles.authHeading}>
        <Image
          source={{
            uri: "https://fv9-5.failiem.lv/thumb_show.php?i=9g49yzj2u&view",
          }}
          style={{ width: 100, height: 100, marginLeft: 10, marginTop: 10 }}
        />

        <Text style={styles.authTitle}>Sign In</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.authInputForm}
          onChangeText={(text) => setDataLogin({ ...dataLogin, email: text })}
        ></TextInput>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          onChangeText={(text) =>
            setDataLogin({ ...dataLogin, password: text })
          }
          placeholder="Password"
          secureTextEntry={true}
          style={styles.authInputForm}
        ></TextInput>
      </View>
      <View style={styles.authButton}>
        <Button
          style={styles.authButton}
          // title={route.params.type == "login" ? "Sign In" : "Sign Up"}
          title={"Sign in"}
          onPress={() => signInButton()}
        ></Button>
      </View>
    </View>
  );
};
