import { View, Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import tailwind from "twrnc";
import * as Linking from "expo-linking";

const ShowroomItem = (props) => {
  return (
    <View
      style={tailwind`flex-row mb-2 justify-between border rounded-xl items-center p-2`}
    >
      <Text style={tailwind`text-lg font-bold text-[#181647]`}>
        {props.name}
      </Text>
      <Pressable
        style={tailwind`flex-row items-center`}
        onPress={() => {
          Linking.openURL(props.link);
        }}
      >
        <Text style={tailwind`font-semibold text-[#cf3636] text-center`}>
          Locate on Map
        </Text>
        <AntDesign name="right" size={15} color="#cf3636" />
      </Pressable>
    </View>
  );
};

export default ShowroomItem;
