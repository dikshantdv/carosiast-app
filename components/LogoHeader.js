import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import tailwind from "twrnc";
import SearchBar from "./SearchBar";
import { useNavigation } from "@react-navigation/native";

const LogoHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        {
          height: 65,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Image
        source={require("../assets/logo/logo.png")}
        style={{ maxWidth: "90%", height: "100%" }}
      />
    </View>
  );
};

export default LogoHeader;
