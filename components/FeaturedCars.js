import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BrandItem from "./BrandItem";
import tailwind from "twrnc";
import CategoryItem from "./CategoryItem";
import FeatureItem from "./FeatureItem";
import SkeletonItem from "./SkeletonItem";
import { useHttpClient } from "../utils/http-hook";

const FeaturedCars = ({ url }) => {
  const { isLoading, sendRequest } = useHttpClient();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const responseData = await sendRequest(url);
      setCars(responseData.cars);
    };
    getData();
  }, [url]);

  return isLoading ? (
    <View style={tailwind`flex-row`}>
      <SkeletonItem w={210} h={240} />
      <SkeletonItem w={210} h={240} />
      <SkeletonItem w={210} h={240} />
    </View>
  ) : (
    <FlatList
      data={cars}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={(itemData) => {
        return <FeatureItem {...itemData.item} />;
      }}
      keyExtractor={(item, index) => {
        return index;
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default FeaturedCars;
