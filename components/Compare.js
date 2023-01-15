import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import tailwind from "twrnc";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import emiCalculator from "../utils/emiCalculator";
import CompareAccordianList from "./CompareAccordianList";
import VarientOverlay from "./VarientOverlay";
import { PressabilityDebugView } from "react-native/Libraries/Pressability/PressabilityDebug";
import CompareCarDescription from "./CompareCarDescription";
import { useSelector } from "react-redux";
import { LoadingScreen } from "./LoadingScreen";

const Compare = () => {
  const loading = useSelector((state) => state.compare.loading);
  const carOne = useSelector((state) => state.compare.carOne);
  const variantOne = useSelector((state) => state.compare.variantOne);
  const carTwo = useSelector((state) => state.compare.carTwo);
  const variantTwo = useSelector((state) => state.compare.variantTwo);

  return loading ? (
    <LoadingScreen />
  ) : (
    <ScrollView style={tailwind`bg-white`}>
      <View style={tailwind`p-2`}>
        <View style={tailwind`flex-row justify-between grow`}>
          <CompareCarDescription
            left
            car={carOne}
            variant={variantOne}
            number={1}
          />
          <CompareCarDescription car={carTwo} variant={variantTwo} number={2} />
        </View>
        {variantOne && variantTwo ? (
          <CompareAccordianList
            list1={variantOne.specs}
            list2={variantTwo.specs}
          />
        ) : (
          <Text style={tailwind`text-center font-bold text-xl`}>
            Select Cars for Comparison
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Compare;
