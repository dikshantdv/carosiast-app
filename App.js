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
import Router from "./Router";

export default function App() {
  return (
    <>
      <NativeBaseProvider>
        <Provider store={store}>
          <StatusBar style="dark" />
          <Router />
        </Provider>
      </NativeBaseProvider>
    </>
  );
}

const styles = StyleSheet.create({});
