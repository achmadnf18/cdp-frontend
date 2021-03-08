import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Containers from "../Screens/Admin/Containers"
import ContainerForm from "../Screens/Admin/ContainerForm"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Containers"
                component={Containers}
                options={{
                    title: "Containers"
                }}
            />
            <Stack.Screen name="ContainerForm" component={ContainerForm} options={{title: 'Container Form'}} />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}