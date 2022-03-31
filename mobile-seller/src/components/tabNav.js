import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "react-native-vector-icons";
import { HomeScreen } from "../screens/Home";
import { OngoingScreen } from "../screens/OngoingScreen";
import ProductRouter from "../routes/ProductRouter";
import { AuthPage } from "../screens/AuthPage";
import { TransactionPage } from "../screens/TransactionPage";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RegisterScreen } from "../screens/RegisterPage";

export default function TabNav() {
  const { token } = useSelector((state) => state.sellersReducer);
  const Tab = createBottomTabNavigator();
  const isLoggedIn = true;

  return (
    <NavigationContainer>
      {!token ? (
        <Tab.Navigator
          screenOptions={{
            tabBarLabelPosition: "beside-icon",
            tabBarLabelStyle: {
              fontWeight: "700",
              fontSize: 15,
            },
            tabBarIconStyle: { display: "none" },
          }}
        >
          <Tab.Screen
            name="Sign In"
            component={AuthPage}
            options={{ headerShown: false }}
            initialParams={{ type: "login" }}
          />
          <Tab.Screen
            name="Sign Up"
            component={RegisterScreen}
            options={{ headerShown: false }}
            initialParams={{ type: "register" }}
          />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home-outline";
              } else if (route.name === "History") {
                iconName = focused ? "ios-wallet" : "ios-wallet-outline";
              } else if (route.name === "Ongoing") {
                return (
                  <FontAwesome5 name={"walking"} size={size} color={color} />
                );
              } else if (route.name === "ProductRouter") {
                iconName = focused ? "cube-outline" : "cube-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "darkblue",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="History"
            component={TransactionPage}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Ongoing"
            component={OngoingScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="ProductRouter"
            component={ProductRouter}
            options={{ headerShown: false, title: "Product" }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
