import { StyleSheet } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

const LinearGradientItem = () => {
  return (
    <LinearGradient
      colors={["#f0f2f4", "#e1e6ea", "#f0f2f4"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.linearContainer}
    />
  );
};

const SkeletonItem = ({ h, w }) => {
  return (
    <Skeleton
      style={styles.container}
      animation="wave"
      LinearGradientComponent={LinearGradientItem}
      skeletonStyle={styles.container}
      width={w ? w : 80}
      height={h ? h : 80}
    />
  );
};

export default SkeletonItem;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: "#f0f2f4",
  },
  linearContainer: {
    flex: 1,
  },
});
