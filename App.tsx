import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import RingIndicatorScreen from "./screens/RingIndicatorScreen";
import LoadingDarkScreen from "./screens/LoadingDarkScreen";
import SwitchScreen from "./screens/SwitchScreen";
import ScrollToIndexScreen from "./screens/ScrollToIndexScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="ScrollToIndex"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="RingIndicator" component={RingIndicatorScreen} />
        <Drawer.Screen name="LoadingDark" component={LoadingDarkScreen} />
        <Drawer.Screen name="Switch" component={SwitchScreen} />
        <Drawer.Screen name="ScrollToIndex" component={ScrollToIndexScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
