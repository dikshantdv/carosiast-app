import { FlatListSlider } from "react-native-flatlist-slider";
import React from "react";

const ImageSlider = ({ images }) => {
  for (var i = 0; i < images.length; ++i) images[i] = { image: images[i] };
  return (
    <FlatListSlider
      data={images}
      //   timer={5000}
      onPress={(item) => {}}
      autoScroll={false}
      // indicator={false}
      indicatorContainerStyle={{ position: "absolute", bottom: 10 }}
      indicatorActiveColor={"#cf3636"}
      indicatorInActiveColor={"#bcbcbc"}
      indicatorActiveWidth={30}
      animation
    />
  );
};

export default ImageSlider;
