import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import tailwind from "twrnc";
import { LoadingScreen } from "./LoadingScreen";
import ImageSlider from "./ImageSlider";
import ListAccordianList from "./ListAccordianList";
import EmiOverlay from "./EmiOverlay";
import VarientOverlay from "./VarientOverlay";
import ShowroomList from "./ShowroomList";
import { useDispatch, useSelector } from "react-redux";
import { getCompareData } from "../store/CompareAction";
import { priceAbbr } from "../utils/priceAbbr";

const Detail = ({ navigation }) => {
  const dispatch = useDispatch();
  const [allSpec, setAllSpec] = useState(false);
  const data = [
    {
      title: "Engine & Transamission",
      data: [
        {
          key: "Engine",
          value: "1197 cc, 4 Cylinders Inline, 4 Valves/Cylinder, DOHC",
        },
        { key: "Engine Type", value: "1.2 Kappa" },
        { key: "Fuel Type", value: "Petrol" },
        { key: "Max Power (bhp)", value: "82" },
        { key: "Max Torque (Nm)", value: "113.8" },
        { key: "Mileage (ARAI)", value: "17.5 kmpl" },
        { key: "Driving Range", value: "789 Km" },
        { key: "Drivetrain", value: "FWD" },
        { key: "Transmission", value: "Manual - 5 Gears" },
        { key: "Emission Standard", value: "BS 6" },
        { key: "Accelaration", value: "10.4 seconds" },
      ],
    },
    {
      title: "Dimensions & Weight",
      data: [
        {
          key: "Length",
          value: "3995 mm",
        },
        { key: "Width", value: "1770 mm" },
        { key: "Height", value: "1617 mm" },
        { key: "Wheelbase", value: "2500 mm" },
        { key: "Ground Clearance", value: "195 mm" },
      ],
    },
    {
      title: "Capacity",
      data: [
        {
          key: "Doors",
          value: "5 Doors",
        },
        { key: "No of Seating Rows", value: "2 Rows" },
        { key: "Fuel Tank Capacity", value: "45 Litres" },
      ],
    },
    {
      title: "Suspensions, Brakes, Steering & Tyres",
      data: [
        {
          key: "Front Suspension",
          value: "McPherson Strut with Coil Spring",
        },
        {
          key: "Rear Suspension",
          value: "Coupled Torsion Beam Axle with Coil Spring",
        },
        { key: "Front Brake Type", value: "Disc" },
        { key: "Rear Brake Type", value: "Drum" },
        { key: "Steering Type", value: "Power assisted (Electric)" },
        { key: "Wheels", value: "Steel Rims" },
        { key: "Spare Wheel", value: "Steel" },
        { key: "Front Tyres", value: "195 / 65 R15" },
        { key: "Rear Tyres", value: "195 / 65 R15" },
      ],
    },
    {
      title: "Safety",

      data: [
        {
          key: "Overspeed Warning",
          value: "1 beep over 80kmph, Continuous beeps over 120kmph",
        },
        { key: "Emergency Brake Light Flashing", value: "No" },
        { key: "Puncture Repair Kit", value: "No" },
        { key: "NCAP Rating", value: "Not Tested" },
        { key: "Airbags", value: "2 Airbags (Driver, Front Passenger)" },
        { key: "Middle rear three-point seatbelt", value: "No" },
        { key: "Middle Rear Head Rest", value: "No" },
        { key: "Tyre Pressure Monitoring System (TPMS)", value: "No" },
        { key: "Child Seat Anchor Points", value: "Yes" },
        { key: "Seat Belt Warning", value: "Yes" },
      ],
    },
    {
      title: "Braking & Traction",
      data: [
        {
          key: "Anti-Lock Braking System (ABS)",
          value: "Yes",
        },
        { key: "Electronic Brake-force Distribution (EBD)", value: "Yes" },
        { key: "Brake Assist (BA)", value: "No" },
        { key: "Electronic Stability Program (ESP)", value: "No" },
        { key: "Hill Hold Control", value: "No" },
        { key: "Traction Control System (TC/TCS)", value: "No" },
        { key: "Hill Descent Control", value: "No" },
      ],
    },
    {
      title: "Locks & Security",
      data: [
        {
          key: "Engine immobilizer",
          value: "Yes",
        },
        { key: "Central Locking", value: "With Key" },
        { key: "Speed Sensing Door Lock", value: "Yes" },
        { key: "Child Safety Lock", value: "Yes" },
      ],
    },
    {
      title: "Comfort & Convenience",
      data: [
        {
          key: "Air Conditioner",
          value: "Yes (Manual)",
        },
        { key: "Front AC", value: "Single Zone, Common Fan Speed Control" },
        { key: "Rear AC", value: "-" },
        { key: "Heater", value: "Yes" },
        { key: "Vanity Mirrors on Sun Visors", value: "No" },
        { key: "Cabin-Boot Access", value: "Yes" },
        { key: "Hill Descent Control", value: "No" },
      ],
    },
    {
      title: "Braking & Traction",
      data: [
        {
          key: "Anti-Lock Braking System (ABS)",
          value: "Yes",
        },
        { key: "Electronic Brake-force Distribution (EBD)", value: "Yes" },
        { key: "Brake Assist (BA)", value: "No" },
        { key: "Electronic Stability Program (ESP)", value: "No" },
        { key: "Hill Hold Control", value: "No" },
        { key: "Traction Control System (TC/TCS)", value: "No" },
        { key: "Hill Descent Control", value: "No" },
      ],
    },
  ];
  const loading = useSelector((state) => state.detail.loading);
  const car = useSelector((state) => state.detail.car);
  const selectedVariant = useSelector((state) => state.detail.selectedVariant);

  return loading ? (
    <LoadingScreen />
  ) : (
    <View style={tailwind`bg-white flex-1 pb-4`}>
      <ScrollView
        style={tailwind`bg-white flex-1 px-4`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tailwind`py-2 flex-row items-center`}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </Pressable>
          <Text style={tailwind`text-3xl font-bold mx-3 capitalize`}>
            {car.company} {car.name}
          </Text>
        </View>
        <View
          style={[
            tailwind`rounded-xl w-full border-2 self-center m-1 overflow-hidden`,
          ]}
        >
          <ImageSlider images={[...car.images]} />
        </View>
        <Text style={tailwind`text-3xl font-bold`}>{selectedVariant.name}</Text>
        <Text style={tailwind`font-bold text-xl`}>
          Rs. {priceAbbr(selectedVariant.price)}*
        </Text>
        <Text style={tailwind`font-normal text-xs`}>*Ex-showroom Price</Text>
        <VarientOverlay
          variants={car.variants}
          carId={car._id}
          selectedVariant={selectedVariant}
        />
        <View style={tailwind`flex-row justify-between items-stretch mb-2`}>
          <EmiOverlay price={selectedVariant.price} />

          <Pressable
            onPress={() => {
              console.log(car._id);
              dispatch(getCompareData(car._id, 1));
              navigation.navigate("Compare");
            }}
            style={tailwind`bg-[#EFEFEF] p-1 rounded flex-row flex-1 items-center ml-1 justify-between`}
          >
            <View>
              <Text style={tailwind`font-bold text-base shadow-xl`}>
                Compare
              </Text>
              <Text>
                Compare{" "}
                {car.name.length > 12 ? `${car.name.slice(0, 11)}..` : car.name}
              </Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </Pressable>
        </View>
        {!allSpec && (
          <View
            style={tailwind`bg-[#EFEFEF]  w-full mb-2 rounded flex justify-around`}
          >
            <View style={tailwind`flex-row justify-around my-2`}>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/car.png")}
                  style={[
                    tailwind`h-10 w-10`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  Engine
                </Text>
                <Text>2.8 L</Text>
              </View>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/manual-transmission.png")}
                  style={[
                    tailwind`h-10 w-10`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  Transmission
                </Text>
                <Text>Manual</Text>
              </View>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/gasoline-pump.png")}
                  style={[
                    tailwind`h-7 w-7`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  Fuel
                </Text>
                <Text>Petrol</Text>
              </View>
            </View>
            <View style={tailwind`flex-row justify-around mb-2`}>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/thunderbolt.png")}
                  style={[
                    tailwind`h-10 w-10`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  BHP
                </Text>
                <Text>100</Text>
              </View>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/gear.png")}
                  style={[
                    tailwind`h-8 w-8`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  Torque
                </Text>
                <Text>250 Nm</Text>
              </View>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/speedometer.png")}
                  style={[
                    tailwind`h-8 w-8`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  Mileage
                </Text>
                <Text>28 KMPL</Text>
              </View>
            </View>
            <View style={tailwind`flex-row justify-around mb-2`}>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/car-seat.png")}
                  style={[
                    tailwind`h-8 w-8`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  Seats
                </Text>
                <Text>5</Text>
              </View>
              <View
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
              >
                <Image
                  source={require("../assets/length.png")}
                  style={[
                    tailwind`h-8 w-8`,
                    { resizeMode: "contain", tintColor: "#CF3636" },
                  ]}
                />
                <Text style={tailwind`font-bold text-sm text-[#181647]`}>
                  Length
                </Text>
                <Text>3995</Text>
              </View>
              <Pressable
                style={tailwind`w-3.5/12 bg-white rounded p-1 flex justify-center items-center`}
                onPress={() => {
                  setAllSpec(true);
                }}
              >
                <Text
                  style={tailwind`font-semibold text-sm text-[#cf3636] text-center`}
                >
                  + View All
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        {allSpec && (
          <>
            <Pressable
              style={tailwind`py-2 flex-row items-center`}
              onPress={() => {
                setAllSpec(false);
              }}
            >
              <AntDesign name="arrowleft" size={15} color="#cf3636" />
              <Text style={tailwind` font-bold text-[#cf3636]`}>Show Less</Text>
            </Pressable>

            <ListAccordianList list={data} />
          </>
        )}
        <View style={tailwind`py-2 flex-row items-center`}>
          <Ionicons name="location-sharp" size={20} color="black" />
          <Text style={tailwind`text-2xl font-bold mx-1`}>
            Showrooms near you
          </Text>
        </View>
        <ShowroomList />
      </ScrollView>
    </View>
  );
};

export default Detail;
