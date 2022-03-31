import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "../screens/Product";
import AddProductScreen from "../screens/AddProduct";
import { ProductUpdate } from "../screens/updateProduct";

const Stack = createNativeStackNavigator();

function ProductRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerStyle: { backgroundColor: "#60a5fa" },
        }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          title: "Add Product",
          headerStyle: { backgroundColor: "#60a5fa" },
        }}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={ProductUpdate}
        options={{
          title: "Edit Menu",
          headerStyle: { backgroundColor: "#60a5fa" },
        }}
      />
    </Stack.Navigator>
  );
}

export default ProductRouter;
