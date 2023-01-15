import { View, Image, Pressable, Text } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { priceAbbr } from "../utils/priceAbbr";

const VariantItem = (props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("CarList");
      }}
      style={tailwind`rounded-xl w-64 bg-[#b8b5f7] px-2 m-1`}
    >
      <View style={tailwind`flex p-1 justify-around`}>
        <View style={tailwind`flex-row justify-between items-center`}>
          <Text style={tailwind`text-[#181647] text-lg font-bold`}>
            {props.name.length > 14
              ? `${props.name.slice(0, 13)}..`
              : props.name}
          </Text>
          <Text style={tailwind`text-[#181647] text-sm font-medium`}>
            Rs. {priceAbbr(props.price)}*
          </Text>
        </View>

        <View style={tailwind`flex-row justify-between`}>
          <Text>{props.fuel}</Text>
          <Text>{props.transmission}</Text>
          <Text>{props.mileage} KM/L</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VariantItem;
