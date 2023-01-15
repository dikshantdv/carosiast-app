import { View, Image, Pressable } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCarListData } from "../store/CarListAction";

const BrandItem = ({ _id, logoUrl }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        dispatch(setCarListData(`company=${_id}`));
        navigation.navigate("CarList");
      }}
      style={tailwind`bg-[#F3F3F3] rounded-full h-20 w-20 overflow-hidden p-0.5 mx-1 flex justify-center items-center`}
    >
      <Image
        source={logoUrl}
        style={[
          { resizeMode: "contain", tintColor: "#181647" },
          tailwind`rounded-xl w-10/12 `,
        ]}
      />
    </Pressable>
  );
};

export default BrandItem;
