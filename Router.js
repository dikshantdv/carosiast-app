import * as Location from "expo-location";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeBaseProvider, Box } from "native-base";
import MenuLists from "./components/MenuLists";
import LogoHeader from "./components/LogoHeader";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Compare from "./components/Compare";
import Detail from "./components/Detail";
import CarList from "./components/CarList";
import { Provider, useDispatch } from "react-redux";
import store from "./store/index";
import { LoadingScreen } from "./components/LoadingScreen";

import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Favorite from "./components/Favorite";
import { createDrawerNavigator } from "@react-navigation/drawer";
import tailwind from "twrnc";
import { useEffect } from "react";
import { detailActions } from "./store/DetailSlice";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigation} />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="CarList" component={CarList} />
    </Stack.Navigator>
  );
};

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#181647",
        cardStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Find"
        component={MenuLists}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="car" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Compare"
        component={Compare}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="compare" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Router() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      dispatch(
        detailActions.replaceCoordinateData([
          location.coords.latitude,
          location.coords.longitude,
        ])
      );
    })();
  }, []);
  const Drawer = createDrawerNavigator();
  const router = (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ navigation }) => {
            return {
              drawerActiveBackgroundColor: "#c6c4ed",
              drawerActiveTintColor: "#181647",
              drawerInactiveTintColor: "#000",
              headerTintColor: "#181647",
              headerTitle: (props) => <LogoHeader {...props} />,
              headerLeft: () => (
                <Pressable onPress={navigation.toggleDrawer}>
                  <Image
                    source={require("./assets/menu.png")}
                    style={tailwind`h-10 w-10`}
                  />
                </Pressable>
              ),
              // headerRight: () => {
              //   return (
              //     <View
              //       style={tailwind`flex-row justify-center items-center h-16`}
              //     >
              //       <Pressable
              //         style={tailwind`py-4 mx-2`}
              //         onPress={() => navigation.navigate("Favorite")}
              //       >
              //         <AntDesign name="hearto" size={28} color="#181647" />
              //       </Pressable>
              //     </View>
              //   );
              // },
            };
          }}
        >
          <Drawer.Screen name="Home" component={StackNavigation} />
          <Drawer.Screen name="Favoritedfs" component={Favorite} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
  return (
    <>
      <StatusBar style="dark" />
      {router}
    </>
  );
}

const styles = StyleSheet.create({});
