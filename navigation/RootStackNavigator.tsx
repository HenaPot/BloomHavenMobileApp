import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/screens/Login";
import Signup from "@/screens/Signup";
import BottomTabNavigator from "./BottomTabNavigator";
import { colors } from "@/constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Product from "@/screens/Product"; // <-- import your Product screen

export type RootStackParams = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
  Product: { id: number };
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackNav = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  return (
    <RootStack.Navigator screenOptions={{ headerTintColor: colors.primary }}>
      {isAuthenticated ? (
        <>
          <RootStack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Product"
            component={Product}
            options={{ headerShown: true, title: "Product Details" }}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="Signup" component={Signup} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootStackNav;