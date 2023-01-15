import { View, Text } from "react-native";
import React from "react";
import FeaturedCars from "./FeaturedCars";
import tailwind from "twrnc";

const MenuSegment = ({ title, url }) => {
  return (
    <>
      <Text style={tailwind`font-semibold text-3xl my-3 text-[#181647]`}>
        {title}
      </Text>
      <FeaturedCars url={url} />
    </>
  );
};

export default MenuSegment;
