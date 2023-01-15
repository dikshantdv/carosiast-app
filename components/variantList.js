import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import BrandItem from "./BrandItem";
import tailwind from "twrnc";
import CategoryItem from "./CategoryItem";
import VariantItem from "./VariantItem";

const VariantList = ({ variants }) => {
  return (
    <FlatList
      data={variants}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={(itemData) => {
        return <VariantItem {...itemData.item} />;
      }}
      keyExtractor={(item, index) => {
        return index;
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default VariantList;
