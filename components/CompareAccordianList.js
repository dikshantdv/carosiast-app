import { View, Text, ScrollView } from "react-native";
import React from "react";
import ListAccordian from "./ListAccordian";
import CompareAccordian from "./CompareAccordian";

const CompareAccordianList = ({ list1, list2 }) => {
  return (
    <>
      {list1.map((item, index) => {
        if (index < list1.length - 1)
          return <CompareAccordian list1={item} list2={list2[index]} />;
        return <CompareAccordian bottom list1={item} list2={list2[index]} />;
      })}
    </>
  );
};

export default CompareAccordianList;
