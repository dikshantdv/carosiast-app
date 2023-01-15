import { View, Text, Pressable, Image } from "react-native";
import React, { useDebugValue } from "react";
import VarientOverlay from "./VarientOverlay";
import tailwind from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SelectCarOverlay from "./SelectCarOverlay";
import { priceAbbr } from "../utils/priceAbbr";
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../store/DetailAction";

const CompareCarDescription = ({ left, car, variant, number }) => {
  const coords = useSelector((state) => state.detail.coordinates);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  if (car) {
    return (
      <View
        style={[
          tailwind`flex-1 items-center rounded-${left ? "tl" : "tr"}-xl`,
          {
            borderColor: "#B3B3B3",
            borderWidth: 1,
          },
        ]}
      >
        <Pressable style={tailwind`flex-row items-center`}>
          <Text style={tailwind`font-bold text-lg`}>{car.name}</Text>
          <SelectCarOverlay arrow number={number} />
        </Pressable>
        <Pressable
          style={tailwind`w-full`}
          onPress={() => {
            dispatch(setDetailData(car._id, coords[0], coords[1]));
            navigation.navigate("Detail");
          }}
        >
          <Image
            source={{
              uri: car.images[0],
            }}
            style={[tailwind`rounded-xl w-11/12 h-[28] self-center m-2`]}
          />
        </Pressable>
        <View style={tailwind`w-full px-2`}>
          <VarientOverlay
            variants={car.variants}
            selectedVariant={variant}
            carId={car._id}
            compare
            number={number}
          />
        </View>
        <Text style={tailwind`font-semibold pb-1`}>
          Rs. {priceAbbr(variant?.price)}(Ex-showroom)
        </Text>
      </View>
    );
  }
  return (
    <View
      style={[
        tailwind`flex-1 items-center rounded-${left ? "tl" : "tr"}-xl`,
        {
          borderColor: "#B3B3B3",
          borderWidth: 1,
        },
      ]}
    >
      <SelectCarOverlay number={number} />
    </View>
  );
};

export default CompareCarDescription;
