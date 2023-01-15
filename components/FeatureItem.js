import { View, Image, Text, Pressable, Platform } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { setDetailData } from "../store/DetailAction";
import { useDispatch, useSelector } from "react-redux";
import { priceAbbr } from "../utils/priceAbbr";

const FeatureItem = (props) => {
  const navigation = useNavigation();
  const coords = useSelector((state) => state.detail.coordinates);

  const dispatch = useDispatch();
  return (
    <Pressable
      android_ripple={{ color: "#cccccc" }}
      onPress={() => {
        dispatch(setDetailData(props._id, coords[0], coords[1]));
        navigation.navigate("Detail");
      }}
      style={({ pressed }) => [
        pressed && Platform.OS === "ios" && { opacity: 0.5 },
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
        tailwind`rounded-xl h-[61] w-52 overflow-hidden p-0.5 mx-2 flex bg-[#F3F3F3]`,
      ]}
    >
      <Image
        source={{
          uri: props.images[0],
        }}
        style={[tailwind`rounded-xl w-11/12 h-36 m-2`]}
      />
      <View style={tailwind`px-2`}>
        <Text style={tailwind`text-lg font-semibold capitalize`}>
          {props.company} {props.name}
        </Text>
        <Text style={tailwind`text-sm font-normal my-1`}>
          Rs. {priceAbbr(props.minPrice)} - {priceAbbr(props.maxPrice)}*
        </Text>
        {/* <Text style={tailwind`text-base font-medium`}>
          Carosiast Rating *****
        </Text> */}
      </View>
    </Pressable>
  );
};

export default FeatureItem;
