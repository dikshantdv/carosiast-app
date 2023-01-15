import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BrandItem from "./BrandItem";
import tailwind from "twrnc";
import { LoadingPlaceholder } from "./LoadingScreen";
import { useSelector } from "react-redux";
import SkeletonItem from "./SkeletonItem";

const BrandList = () => {
  const brands = useSelector((state) => state.brand.brands);

  return (
    <FlatList
      data={brands}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={(itemData) => {
        return <BrandItem {...itemData.item} />;
      }}
      keyExtractor={(item, index) => {
        return index;
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default BrandList;
