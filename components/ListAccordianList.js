import { View, Text, ScrollView } from "react-native";
import React from "react";
import ListAccordian from "./ListAccordian";

const ListAccordianList = ({ list }) => {
  const topElement = list.shift();
  const bottomElement = list.pop();
  return (
    <>
      <ListAccordian top list={topElement} />
      {list.map((item) => (
        <ListAccordian list={item} />
      ))}
      {/* <ListAccordian /> */}
      <ListAccordian bottom list={bottomElement} />
    </>
  );
};

export default ListAccordianList;
