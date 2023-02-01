import { View, Text } from "react-native";

const LoadingIndicator = ({ size }: { size: number }) => {
  return <View />;
};

const LoadingDarkScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#010100",
      }}
    >
      <LoadingIndicator size={100} />
    </View>
  );
};

export default LoadingDarkScreen;
