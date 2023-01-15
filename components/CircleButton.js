import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable } from "react-native";
import tailwind from "twrnc";

const CircleButton = () => {
  const [isFav, setIsFav] = useState(false);
  const handlePress = () => {
    setIsFav((prevState) => !prevState);
  };
  return (
    <Pressable
      style={[
        {
          width: 40,
          height: 40,
          backgroundColor: "white",
          position: "absolute",
          right: 5,
          top: 5,
          alignItems: "center",
          justifyContent: "center",
        },
        tailwind`z-50 border bg-[#ddd] rounded-full`,
      ]}
      onPress={handlePress}
    >
      <AntDesign
        name={isFav ? "heart" : "hearto"}
        size={24}
        color={isFav ? "#d03938" : "#181647"}
      />
    </Pressable>
  );
};

export default CircleButton;
