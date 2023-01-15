import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import VariantList from "./variantList";
import CircleButton from "./CircleButton";
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../store/DetailAction";
import { priceAbbr } from "../utils/priceAbbr";

const CarItem = (props) => {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.detail.coordinates);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        dispatch(setDetailData(props._id, coords[0], coords[1]));
        navigation.navigate("Detail");
      }}
      style={[
        {
          shadowColor: "#74858C",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        },
        tailwind`rounded-xl overflow-hidden p-0.5 m-2 flex bg-white`,
      ]}
    >
      {/* <CircleButton /> */}
      <Image
        source={{
          uri: props.images[0],
        }}
        style={[
          tailwind`rounded-xl w-full h-[50] self-center mb-2`,
          { borderColor: "#DEE2E6", borderWidth: 3 },
        ]}
      />
      <View style={tailwind`px-2`}>
        <Text style={tailwind`text-2xl font-bold capitalize`}>
          {props.company} {props.name}
        </Text>
        <Text style={tailwind`text-base font-medium my-0.5`}>
          Rs. {priceAbbr(props.minPrice)} - {priceAbbr(props.maxPrice)}*
        </Text>
        <VariantList variants={props.variants} />
      </View>
    </Pressable>
  );
};

export default CarItem;
