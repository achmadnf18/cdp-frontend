import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

// Stacks
import AdminNavigator from "./AdminNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {

  return (
    <Tab.Navigator
      initialRouteName="Admin"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
          tabBarVisible: false
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
