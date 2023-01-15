import React, { useState, useEffect } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import tailwind from "twrnc";
import { useNavigation } from "@react-navigation/native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useHttpClient } from "../utils/http-hook";
import { useDispatch } from "react-redux";
import { setDetailData } from "../store/DetailAction";
import { priceAbbr } from "../utils/priceAbbr";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [enteredValue, setEnteredValue] = useState("");
  const { isLoading, sendRequest } = useHttpClient();
  const [data, setData] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredValue != "") {
        const getData = async () => {
          const responseData = await sendRequest(
            `https://carosiast-backend.onrender.com/cars/getSearchResult/${enteredValue}`
          );
          console.log(responseData.cars);
          setData(responseData.cars);
        };
        getData();
      } else {
        setData([]);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [enteredValue]);
  const navigation = useNavigation();

  return (
    <View style={tailwind`border-b border-t border-gray-400 bg-white p-2 z-40`}>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        useFilter={false}
        onChangeText={setEnteredValue}
        suggestionsListMaxHeight={500}
        renderItem={(item, text) => {
          if (data.indexOf(item) == 0) {
            return (
              <Pressable
                onPress={() => {
                  dispatch(setDetailData(item._id));
                  navigation.navigate("Detail");
                }}
                style={tailwind`flex-row z-50`}
              >
                <Image
                  source={{
                    uri: item.images,
                  }}
                  style={[tailwind`rounded-xl w-4/12 h-[22] self-center m-2`]}
                />
                <View style={tailwind`flex justify-around py-4 px-2`}>
                  <Text style={tailwind`text-lg font-bold capitalize`}>
                    {item.company} {item.name}
                  </Text>
                  <Text>
                    Rs. {priceAbbr(item.minPrice)} - {priceAbbr(item.maxPrice)}
                  </Text>
                  {/* <Text style={tailwind`text-md font-bold`}>12 Variants</Text> */}
                </View>
              </Pressable>
            );
          } else {
            return (
              <Pressable
                onPress={() => navigation.navigate("Detail")}
                style={tailwind`flex-row z-50`}
              >
                <View style={tailwind`flex justify-around py-4 px-2`}>
                  <Text style={tailwind`text-lg font-bold capitalize`}>
                    {item.company} {item.name}
                  </Text>
                  <Text>
                    Rs. {priceAbbr(item.minPrice)} - {priceAbbr(item.maxPrice)}{" "}
                    Lakhs
                  </Text>
                </View>
              </Pressable>
            );
          }
        }}
        loading={isLoading}
        dataSet={data}
        textInputProps={{
          placeholder: "Find Car",
          autoCorrect: false,
          autoCapitalize: "none",
          style: {
            borderRadius: 5,
            backgroundColor: "#F3F3F3",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 18,
            zIndex: 50,
          },
        }}
        inputContainerStyle={{
          backgroundColor: "#F3F3F3",
          borderRadius: 5,
          zIndex: 50,
        }}
        suggestionsListContainerStyle={{
          backgroundColor: "#fff",
          zIndex: 50,
        }}
        ChevronIconComponent={
          <Feather name="chevron-down" size={20} color="#181647" />
        }
        ClearIconComponent={<Feather name="x" size={18} color="#181647" />}
      />
    </View>
  );
};

export default SearchBar;
