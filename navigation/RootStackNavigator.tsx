import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/screens/Login";
import Signup from "@/screens/Signup";
import BottomTabNavigator from "./BottomTabNavigator";
import { colors } from "@/constants/colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export type RootStackParams = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
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