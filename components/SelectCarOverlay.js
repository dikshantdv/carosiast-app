import SearchBar from "./SearchBar";
import React, { useState, useEffect } from "react";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {
  Modal,
  FormControl,
  Input,
  Box,
  Slider,
  VStack,
  HStack,
  Select,
  CheckIcon,
  Spacer,
} from "native-base";
import tailwind from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import SliderItem from "./SliderItem";
import emiCalculator from "../utils/emiCalculator";
import { useDispatch } from "react-redux";
import { getCompareData } from "../store/CompareAction";
import { useHttpClient } from "../utils/http-hook";
import { priceAbbr } from "../utils/priceAbbr";

const SelectCarOverlay = ({ number, arrow }) => {
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
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          bg: "muted.900",
        }}
        size="xl"
      >
        <Modal.Content maxWidth="400px" minHeight="50%" maxHeight="50%">
          {/* <Modal.Header>Select Car</Modal.Header> */}
          <Modal.Header>Variants</Modal.Header>
          <Modal.Body p="0">
            <Box alignItems="center" w="100%">
              <Input
                value={enteredValue}
                w="90%"
                m="2"
                onChangeText={setEnteredValue}
                placeholder="Enter Car Name"
              />

              <FlatList
                style={tailwind`w-full`}
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      dispatch(getCompareData(item._id, number));
                      // setSelectedVariant(item);
                      setShowModal(false);
                    }}
                  >
                    <Box
                      borderBottomWidth="1"
                      w="full"
                      borderColor="muted.300"
                      p="2"
                    >
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <VStack>
                          <Text style={tailwind`font-bold text- capitalize`}>
                            {item.company} {item.name}
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text style={tailwind`font-bold text-xl`}>
                          {priceAbbr(item.minPrice)} {priceAbbr(item.maxPrice)}*
                        </Text>
                      </HStack>
                    </Box>
                  </Pressable>
                )}
                keyExtractor={(item) => item.id}
              />
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      {arrow ? (
        <Pressable
          onPress={() => {
            setShowModal(!showModal);
          }}
          style={tailwind`bg-[#EFEFEF] p-1 rounded flex-row items-center ml-1 justify-between`}
        >
          <AntDesign name="caretdown" size={10} color="#ababab" />
        </Pressable>
      ) : (
        <Pressable
          style={tailwind`w-full my-auto`}
          onPress={() => setShowModal(true)}
        >
          <View
            style={[
              tailwind`rounded-xl w-11/12 h-[28] self-center m-2 flex items-center justify-center border`,
            ]}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </View>
        </Pressable>
      )}
    </>
  );
};

export default SelectCarOverlay;
