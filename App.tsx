import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import RingIndicatorScreen from "./screens/RingIndicatorScreen";
import LoadingDarkScreen from "./screens/LoadingDarkScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="RingIndicator">
        <Drawer.Screen
          name="RingIndicator"
          component={RingIndicatorScreen}
          options={{
            headerStyle: {
              backgroundColor: "#c9184a",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
            headerTitle: "Ring Indicator Animation",
          }}
        />
        <Drawer.Screen
          name="LoadingDark"
          component={LoadingDarkScreen}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
