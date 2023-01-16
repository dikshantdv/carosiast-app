import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import React from "react";
import tailwind from "twrnc";
import BrandList from "./BrandList";
import CategoryList from "./CategoryList";
import FeaturedCars from "./FeaturedCars";
import SearchBar from "./SearchBar";
import EmiOverlay from "./EmiOverlay";
import MenuSegment from "./MenuSegment";
import { useSelector } from "react-redux";

const MenuLists = () => {
  const menus = useSelector((state) => state.menu.menus);

  return (
    <View>
      <SearchBar />
      <View style={tailwind`px-2 pb-32 bg-[#ffffff]`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tailwind`font-semibold text-3xl my-3 text-[#181647]`}>
            Brands
          </Text>
          <BrandList />
          <Text style={tailwind`font-semibold text-3xl my-3 text-[#181647]`}>
            Categories
          </Text>
          <CategoryList />
          {menus.map((item) => (
            <MenuSegment {...item} key={item.title} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MenuLists;
