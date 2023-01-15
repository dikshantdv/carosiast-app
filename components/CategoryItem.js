import { View, Image, Text, Pressable } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCarListData } from "../store/CarListAction";

const CategoryItem = ({ categoryUrl, _id, name }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={[tailwind`bg-white mx-2 rounded-xl`]}>
      <Pressable
        onPress={() => {
          dispatch(setCarListData(`category=${_id}`));
          navigation.navigate("CarList");
        }}
        style={[
          tailwind`rounded-md h-30 w-30 overflow-hidden flex items-center`,
        ]}
      >
        <Image
          source={categoryUrl}
          style={[tailwind`rounded-md flex-1 w-full`]}
        />
        <Text style={tailwind`text-base font-medium`}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default CategoryItem;
