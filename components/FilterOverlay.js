import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Modal,
    FormControl,
    Input,
    Box,
    Slider,
    VStack,
    HStack, Checkbox, Button
} from "native-base";
import tailwind from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SliderItem from "./SliderItem";
import emiCalculator from "../utils/emiCalculator";
import { priceAbbr } from "../utils/priceAbbr";
import { useDispatch } from "react-redux";
import { setCarListData } from "../store/CarListAction";
import { useNavigation } from "@react-navigation/native";

const FilterOverlay = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false);
    const [transmissionValues, setTransmissionValues] = React.useState([]);
    const [fuelValues, setFuelValues] = React.useState([]);
    const [maxValue, setMaxValue] = React.useState();
    const [minValue, setMinValue] = React.useState();

    const filterhandler = () => {
        let query = null;
        if (maxValue) { query = `price[lte]=${maxValue}` }
        if (minValue) { query = query ? query + `&price[gte]=${minValue}` : `price[gte]=${minValue}` }
        if (fuelValues.length > 0) {
            if (query) {
                query = query + '&'
            }
            fuelValues.forEach((el) => {
                query = query + `fuel=${el}`
                if (fuelValues.slice(-1) != el) {

                    query = query + "&"
                }
            })
        }
        if (transmissionValues.length > 0) {
            if (query) {
                query = query + '&'
            }
            transmissionValues.forEach((el) => {
                if (el === 'Manual') {
                    query = query + `transmission=${el}`
                } else {
                    query = query + `transmission[$ne]=${el}`
                }

                if (transmissionValues.slice(-1) != el) {


                    query = query + "&"
                }
            })
        }
        dispatch(setCarListData(query));
        setShowModal(false)
        navigation.navigate("CarList");
        setMaxValue()
        setMinValue()
        setTransmissionValues([])
        setFuelValues([])
    }

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
                    <Modal.Header>Apply Filters</Modal.Header>
                    <Modal.Body>
                        <Box alignItems="center" w="100%">
                            <VStack w="90%" maxW="300" space={2}>
                                <HStack justifyContent="space-between" alignItems='center'>
                                    <Text style={tailwind`font-bold text-lg`}>
                                        Min Price: ₹
                                    </Text>
                                    <Text></Text>
                                    <Input
                                        value={minValue}
                                        w="60%"
                                        m="2"
                                        keyboardType="number-pad"
                                        onChangeText={setMinValue}
                                        placeholder="Enter minimum price"
                                    />

                                </HStack>
                                <HStack justifyContent="space-between" alignItems='center'>
                                    <Text style={tailwind`font-bold text-lg`}>
                                        Max Price: ₹
                                    </Text>
                                    <Text></Text>
                                    <Input
                                        value={maxValue}
                                        w="60%"
                                        m="2"
                                        keyboardType="number-pad"
                                        onChangeText={setMaxValue}
                                        placeholder="Enter max price"
                                    />
                                </HStack>
                                <Text style={tailwind`font-bold text-lg`}>
                                    Transmission:
                                </Text>
                                <Checkbox.Group onChange={setTransmissionValues} value={transmissionValues} accessibilityLabel="choose numbers">
                                    <HStack alignItems="center">
                                        <Checkbox value="Automatic" my={2}>
                                            Automatic
                                        </Checkbox>
                                        <Checkbox value="Manual">Manual</Checkbox>
                                    </HStack>
                                </Checkbox.Group>
                                <Text style={tailwind`font-bold text-lg`}>
                                    Fuel:
                                </Text>
                                <Checkbox.Group onChange={setFuelValues} value={fuelValues} accessibilityLabel="choose numbers">
                                    <HStack alignItems="center">
                                        <Checkbox value="Petrol" my={2}>
                                            Petrol
                                        </Checkbox>
                                        <Checkbox value="Diesel">Diesel</Checkbox>

                                    </HStack>
                                </Checkbox.Group>
                                <Button onPress={filterhandler}>Filter</Button>
                            </VStack>
                        </Box>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <View
                style={tailwind`flex-row justify-center items-center h-16`}
            >
                <Pressable
                    onPress={() => {
                        setShowModal(!showModal);
                    }}
                    style={tailwind`py-4 mx-2`}
                >
                    <Ionicons name="funnel-outline" size={24} color="black" />
                </Pressable>
            </View>

        </>
    );
};

export default FilterOverlay;
