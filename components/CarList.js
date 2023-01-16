import { View, Text, Image, FlatList } from "react-native";
import React, { useState } from "react";
import BrandItem from "./BrandItem";
import tailwind from "twrnc";
import CategoryItem from "./CategoryItem";
import CarItem from "./CarItem";
import { LoadingPlaceholder, LoadingScreen } from "./LoadingScreen";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const CarList = () => {
  const loading = useSelector((state) => state.carList.loading);
  const cars = useSelector((state) => state.carList.cars);
  return loading ? (
    <LoadingScreen />
  ) : (
    <View style={tailwind`flex-1 pb-4`}>
      <SearchBar />
      <FlatList
        data={cars}
        showsHorizontalScrollIndicator={false}
        renderItem={(itemData) => {
          return <CarItem {...itemData.item} />;
        }}
        keyExtractor={(item, index) => {
          return index;
        }}
        alwaysBounceVertical={false}
      />
    </View>
  );
};

export default CarList;
