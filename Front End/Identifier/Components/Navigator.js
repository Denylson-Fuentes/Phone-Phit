import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './Home';
import PredcitionScreen from './Prediction';
import FriendScreen from './Friends';

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarOptions: {
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-home"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        );
      },
    },
  },
  Friends: {
    screen: FriendScreen,
    navigationOptions: {
      tabBarLabel: "Friends",
      tabBarOptions: {
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-people-circle-outline"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        );
      },
    },
  },
  Prediction: {
    screen: PredcitionScreen,
    navigationOptions: {
      tabBarLabel: "Predictor",
      tabBarOptions: {
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-scan-circle"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
          />
        );
      },
    },
  },
});

const Navigator = createAppContainer(TabNavigator);


export default Navigator;