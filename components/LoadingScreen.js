import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import tailwind from "twrnc";

export const LoadingScreen = () => {
  return (
    <View style={tailwind`flex-1 justify-center items-center bg-white`}>
      <LottieView
        autoPlay
        style={{
          width: 300,
          height: 300,
          backgroundColor: "#fff",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/car.json")}
      />
    </View>
  );
};

export const LoadingPlaceholder = ({ w, h }) => {
  return (
    <View
      style={[
        {
          width: w || 300,
          height: h || 300,
          backgroundColor: "#eee",
          overflow: "hidden",
        },
        tailwind`rounded-xl mx-1 shadow-2xl`,
      ]}
    >
      <LottieView
        autoPlay
        style={[
          {
            width: w || 300,
            height: h || 300,
            backgroundColor: "#eee",
          },
          tailwind`shadow-md`,
        ]}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/loadlazy.json")}
      />
    </View>
  );
};
