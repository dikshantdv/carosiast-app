import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
    Modal,
    FormControl,
    Input,
    Box,
    Slider,
    VStack,
    HStack,
} from "native-base";
import tailwind from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import SliderItem from "./SliderItem";
import emiCalculator from "../utils/emiCalculator";
import { priceAbbr } from "../utils/priceAbbr";

const FilterOverlay = ({ price = 1100000 }) => {
    const [showModal, setShowModal] = useState(false);
    const [emiData, setEmiData] = useState({
        loanAmount: (price * 0.9).toFixed(),
        rate: 9,
        tenure: 5,
    });
    const [emi, setEmi] = useState(
        emiCalculator(emiData.loanAmount, emiData.rate, emiData.tenure)
    );
    useEffect(() => {
        const timer = setTimeout(() => {
            setEmi(emiCalculator(emiData.loanAmount, emiData.rate, emiData.tenure));
        }, 300);
        return () => {
            clearTimeout(timer);
        };
    }, [emiData]);
    const minDownPayment = (price * 0.1).toFixed();
    const maxDownpayment = (price * 0.95).toFixed();
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
                                <Text style={tailwind`font-bold text-lg `}>
                                    Min Price: ₹
                                    {priceAbbr(
                                        (price - emiData.loanAmount)
                                            .toFixed()
                                            .toLocaleString("en-IN")
                                    )}
                                </Text>
                                <VStack>
                                    <SliderItem
                                        value={price - emiData.loanAmount}
                                        max={price * 0.95}
                                        min={price * 0.1}
                                        step={10000}
                                        onChange={(e) => {
                                            setEmiData((prev) => {
                                                return { ...prev, loanAmount: (price - e).toFixed() };
                                            });
                                        }}
                                    />
                                    <HStack justifyContent="space-between">
                                        <Text>₹ {priceAbbr(minDownPayment)}</Text>
                                        <Text>₹ {priceAbbr(maxDownpayment)}</Text>
                                    </HStack>
                                </VStack>
                                <Text style={tailwind`font-bold text-base`}>
                                    Loan Amount will be: ₹ {priceAbbr(emiData.loanAmount)}
                                </Text>
                                <HStack justifyContent="space-between">
                                    <VStack w="2/5">
                                        <Text style={tailwind`font-bold text-base `}>
                                            Tenure: {emiData.tenure} years
                                        </Text>
                                        <SliderItem
                                            value={emiData.tenure}
                                            min={1}
                                            max={10}
                                            step={1}
                                            onChange={(e) => {
                                                setEmiData((prev) => {
                                                    return { ...prev, tenure: e };
                                                });
                                            }}
                                        />
                                        <HStack justifyContent="space-between">
                                            <Text>1 year</Text>
                                            <Text>10 year</Text>
                                        </HStack>
                                    </VStack>
                                    <VStack w="2/5">
                                        <Text style={tailwind`font-bold text-base`}>
                                            Interest: {emiData.rate}%
                                        </Text>
                                        <SliderItem
                                            value={emiData.rate}
                                            min={1}
                                            max={15}
                                            step={1}
                                            onChange={(e) => {
                                                setEmiData((prev) => {
                                                    return { ...prev, rate: e };
                                                });
                                            }}
                                        />
                                        <HStack justifyContent="space-between">
                                            <Text>1%</Text>
                                            <Text>15%</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                                <Text style={tailwind`font-bold text-xl`}>
                                    ₹{priceAbbr(emi)} EMI for {emiData.tenure} years
                                </Text>
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
