import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Slider } from "@rneui/themed";
import { Tooltip } from "native-base";
import tailwind from "twrnc";

const SliderItem = ({ min, max, step, onChange, value }) => {
  return (
    <Slider
      value={value}
      maximumValue={max}
      minimumValue={min}
      step={step}
      allowTouchTrack
      onValueChange={onChange}
      trackStyle={{ height: 5, backgroundColor: "transparent" }}
      thumbStyle={{ height: 10, width: 10, backgroundColor: "transparent" }}
      thumbProps={{
        children: (
          <View style={tailwind`bg-black h-2.5 w-2.5 rounded-full`}></View>
        ),
      }}
    />
  );
};

export default SliderItem;
