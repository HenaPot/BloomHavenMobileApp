import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/screens/Login";
import Signup from "@/screens/Signup";
import Dashboard from "@/screens/Dashboard";
import Profile from "@/screens/Profile";
import AllProducts from "@/screens/AllProducts";
import Product from "@/screens/Product";
import ShoppingCart from "@/screens/ShoppingCart";
import Wishlist from "@/screens/Wishlist";
import { colors } from "@/constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export type RootStackParams = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  Profile: undefined;
  AllProducts: undefined;
  Product: { id: string };
  ShoppingCart: undefined;
  Wishlist: undefined;
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
          <RootStack.Screen name="Dashboard" component={Dashboard} />
          <RootStack.Screen name="AllProducts" component={AllProducts} />
          <RootStack.Screen name="Product" component={Product} />
          <RootStack.Screen name="Profile" component={Profile} />
          <RootStack.Screen name="ShoppingCart" component={ShoppingCart} />
          <RootStack.Screen name="Wishlist" component={Wishlist} />
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