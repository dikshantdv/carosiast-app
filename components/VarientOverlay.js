import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Modal,
  FormControl,
  Input,
  Box,
  Slider,
  VStack,
  HStack,
  Spacer,
  Heading,
  Avatar,
} from "native-base";
import tailwind from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useDispatch } from "react-redux";
import { setSelectedVariantData } from "../store/DetailAction";
import { getSelectedVariantData } from "../store/CompareAction";
import { priceAbbr } from "../utils/priceAbbr";

const VarientOverlay = ({
  variants,
  selectedVariant,
  carId,
  compare,
  number,
}) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

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
        <Modal.Content maxWidth="400px" maxHeight="50%">
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Variants</Modal.Header>
          <Modal.Body p="0">
            <Box alignItems="center" w="100%">
              <FlatList
                style={tailwind`w-full`}
                data={variants}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      if (compare) {
                        if (number == 1) {
                          dispatch(getSelectedVariantData(item._id, carId, 1));
                        } else {
                          dispatch(getSelectedVariantData(item._id, carId, 2));
                        }
                      } else {
                        dispatch(setSelectedVariantData(item._id, carId));
                      }
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
                          <Text style={tailwind`font-bold text-lg`}>
                            {item.name.length > 20
                              ? `${item.name.slice(0, 19)}..`
                              : item.name}
                          </Text>
                          <HStack justifyContent="space-between" space={5}>
                            <Text>{item.fuel}</Text>
                            <Text>{item.transmission}</Text>
                          </HStack>
                        </VStack>
                        <Spacer />
                        <Text style={tailwind`font-bold text-xl`}>
                          {priceAbbr(item.price)}*
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
      <Pressable
        onPress={() => {
          setShowModal(!showModal);
        }}
        style={tailwind`bg-[#EFEFEF] p-1 my-2 rounded flex-row items-center justify-between w-full`}
      >
        <View>
          <Text style={tailwind`font-bold text-lg shadow-xl`}>Variants</Text>
          <Text>
            {selectedVariant.name.length > 12
              ? `${selectedVariant.name.slice(0, 11)}.. `
              : `${selectedVariant.name} `}
            {selectedVariant.fuel}
          </Text>
        </View>
        <AntDesign name="right" size={24} color="black" />
      </Pressable>
    </>
  );
};

export default VarientOverlay;
