import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image:
      "https://res.cloudinary.com/dcsxqp45e/image/upload/v1640675869/UberX_hdmhsj.webp",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image:
      "https://res.cloudinary.com/dcsxqp45e/image/upload/v1640675879/UberXL_gzbm8f.webp",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber Premium",
    multiplier: 1.75,
    image:
      "https://res.cloudinary.com/dcsxqp45e/image/upload/v1640675878/Lux_qoeum3.webp",
  },
];

// If we have SURGE pricing, this goes up
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl -mb-2`}>
          Select a ride -{" "}
          {Math.round(parseInt(travelTimeInformation?.distance?.value) / 1000)}{" "}
          km
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl ml-2`}>
              ₱{" "}
              {new Intl.NumberFormat("en-us", {
                style: "decimal",
                currency: "PHP",
                currencySign: "standard",
              }).format(
                Math.round(
                  (travelTimeInformation?.duration?.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    10
                )
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 -mb-1 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
