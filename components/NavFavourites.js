import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";

const data = [
  {
    id: "123",
    icon: "home",
    type: "Home",
    location: {
      lat: 14.6816917,
      lng: 120.9780893,
    },
    destination: "Mommy Bhabes Catering Services",
    description:
      "Mommy Bhabes Catering and Events, Don Pedro Village, Valenzuela, Metro Manila, Philippines",
  },
  {
    id: "456",
    icon: "briefcase",
    type: "Work",
    location: {
      lat: 14.5408671,
      lng: 121.0503183,
    },
    destination: "Bonifacio Global City",
    description: "BGC, Taguig, Metro Manila, Philippines",
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  const overrideValues = (item) => {
    console.log(item);
    if (item?.type === "Home") {
      dispatch(
        setOrigin({
          location: item.location,
          description: item.description,
        })
      );
    } else {
      dispatch(
        setDestination({
          location: item.location,
          description: item.description,
        })
      );
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-500 h-1`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { location, type, destination, icon }, item }) => (
        <TouchableOpacity
          onPress={() => overrideValues(item)}
          style={tw`flex-row items-center p-5`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{type}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
