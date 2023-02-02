import { View, Text, StyleSheet, Pressable } from "react-native";
import { MotiTransitionProp, MotiView } from "moti";
import { useMemo, useState } from "react";
import { Easing } from "react-native-reanimated";

const _colors = {
  active: "#2C2C2C",
  inactive: "#DCDCDC",
};

type SwitchProps = {
  size: number;
  onPress: () => void;
  isActive: boolean;
};

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const Switch = ({ size, onPress, isActive }: SwitchProps) => {
  const trackWidth = useMemo(() => {
    return size * 1.5;
  }, [size]);

  const trackHeight = useMemo(() => {
    return size * 0.4;
  }, [size]);

  const knobSize = useMemo(() => {
    return size * 0.6;
  }, [size]);

  return (
    <Pressable onPress={onPress}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MotiView
          animate={{
            backgroundColor: isActive ? _colors.inactive : _colors.active,
          }}
          transition={transition}
          style={{
            position: "absolute",
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: _colors.active,
          }}
        />
        <MotiView
          animate={{
            translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
          }}
          transition={transition}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MotiView
            animate={{
              width: isActive ? 0 : knobSize,
              borderColor: isActive ? _colors.active : _colors.inactive,
            }}
            transition={transition}
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size * 0.1,
              borderColor: _colors.active,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
};

const SwitchScreen = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.container}>
      <Switch
        size={40}
        onPress={() => {
          setIsActive(!isActive);
        }}
        isActive={isActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebebeb",
  },
});

export default SwitchScreen;
