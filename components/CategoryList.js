import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import BrandItem from "./BrandItem";
import tailwind from "twrnc";
import CategoryItem from "./CategoryItem";
import { useSelector } from "react-redux";
import SkeletonItem from "./SkeletonItem";

const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);

  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={(itemData) => {
        return <CategoryItem {...itemData.item} />;
      }}
      keyExtractor={(item, index) => {
        return index;
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default CategoryList;
