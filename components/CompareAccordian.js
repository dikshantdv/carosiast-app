import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Icon, ListItem } from "@rneui/themed";
import tailwind from "twrnc";
const Item = (data, data2) => {
  return (
    <>
      <View
        style={[
          tailwind`flex-1 flex items-center p-1`,
          {
            borderLeftColor: "#B3B3B3",
            borderLeftWidth: 1,
            borderRightColor: "#B3B3B3",
            borderRightWidth: 1,
            borderBottomColor: "#B3B3B3",
            borderBottomWidth: 1,
          },
        ]}
      >
        <Text style={tailwind`font-medium `}>{data.key}</Text>
      </View>
      <View
        style={[
          tailwind`flex-row justify-between`,
          {
            borderLeftColor: "#B3B3B3",
            borderLeftWidth: 1,
            borderRightColor: "#B3B3B3",
            borderRightWidth: 1,
            borderBottomColor: "#B3B3B3",
            borderBottomWidth: 1,
          },
        ]}
      >
        <View
          style={[
            tailwind`w-6/12 p-2 flex justify-center`,
            { borderRightColor: "#B3B3B3", borderRightWidth: 1 },
          ]}
        >
          <Text style={tailwind`text-center`}>{data.value}</Text>
        </View>
        <View style={tailwind`w-6/12 p-2`}>
          <Text style={tailwind`text-center`}>{data2.value}</Text>
        </View>
      </View>
    </>
  );
};

const CompareAccordian = ({ top, bottom, list1, list2 }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem.Accordion
      style={[
        tailwind`${top && "rounded-t-xl"} ${
          bottom && !expanded && "rounded-b-xl"
        }`,
        {
          borderTopColor: "#B3B3B3",
          borderTopWidth: top ? 1 : 0,
          borderLeftColor: "#B3B3B3",
          borderLeftWidth: 1,
          borderRightColor: "#B3B3B3",
          borderRightWidth: 1,
          borderBottomColor: "#B3B3B3",
          borderBottomWidth: 1,
        },
      ]}
      containerStyle={tailwind`${top && "rounded-t-xl"} ${
        bottom && "rounded-b-xl"
      }`}
      content={
        <View style={tailwind`flex-1`}>
          <ListItem.Content style={tailwind``}>
            <ListItem.Title style={[tailwind`text-xl font-bold`]}>
              {list1.title}
            </ListItem.Title>
          </ListItem.Content>
        </View>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {list1.data.map((l, i) => (
        <ListItem key={i} Component={Item.bind(this, l, list2.data[i])} />
      ))}
    </ListItem.Accordion>
  );
};

export default CompareAccordian;
