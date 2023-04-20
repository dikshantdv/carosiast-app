import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Modal,
    FormControl,
    Input,
    Box,
    Slider,
    VStack,
    HStack, Button
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import tailwind from "twrnc";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SliderItem from "./SliderItem";
import emiCalculator from "../utils/emiCalculator";
import { priceAbbr } from "../utils/priceAbbr";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../utils/http-hook";
import { setSelectedCityData } from "../store/DetailAction";

const LocationOverlay = ({ price }) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const location = useSelector((state) => state.detail.cityName);
    const [enteredValue, setEnteredValue] = useState(location);

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
                <Modal.Content maxWidth="400px">
                    {/* <Modal.CloseButton /> */}
                    <Modal.Header>Enter City name</Modal.Header>
                    <Modal.Body>
                        <Box alignItems="center" w="100%">
                            <VStack w="90%" maxW="300" space={2}>
                                <Input
                                    value={enteredValue}
                                    w="90%"
                                    m="2"
                                    onChangeText={setEnteredValue}
                                    placeholder="Enter Car Name"
                                />

                                <Button onPress={() => { dispatch(setSelectedCityData(enteredValue)); setShowModal(false) }}>Enter</Button>
                            </VStack>
                        </Box>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <Pressable
                onPress={() => {
                    setShowModal(!showModal);
                }}
                style={tailwind`flex-row items-center`}
            >
                <Entypo name="location-pin" size={20} color="black" />
                <Text style={tailwind`font-semibold underline text-xl my-3 text-[#181647]`}>
                    {location}
                </Text>

            </Pressable>
        </>
    );
};

export default LocationOverlay;
