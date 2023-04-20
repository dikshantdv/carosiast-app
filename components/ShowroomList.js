import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import BrandItem from "./BrandItem";
import tailwind from "twrnc";
import CategoryItem from "./CategoryItem";
import VariantItem from "./VariantItem";
import ShowroomItem from "./ShowroomItem";
import { useSelector } from "react-redux";
import SkeletonItem from "./SkeletonItem";

const List = () => {
  const showrooms = useSelector((state) => state.detail.showrooms);
  const loading = useSelector((state) => state.detail.showroomLoading);
  console.log(loading, showrooms);

  return loading ? (
    <SkeletonItem w={350} h={200} />
  ) : (
    <FlatList
      data={showrooms}
      showsHorizontalScrollIndicator={false}
      renderItem={(itemData) => {
        return <ShowroomItem {...itemData.item} />;
      }}
      keyExtractor={(item, index) => {
        return index;
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default List;
