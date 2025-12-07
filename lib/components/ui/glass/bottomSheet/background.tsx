import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";

interface GlassBackgroundProps extends BottomSheetBackgroundProps {
  radius?: number;
  backgroundBlur?: number;
}

export default function GlassSheetBackground({
  style,
  radius = 30,
  backgroundBlur = 25,
}: GlassBackgroundProps) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  return (
    <View
      style={[
        style,
        {
          borderRadius: radius,
          overflow: "hidden",
        },
      ]}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ width, height });
      }}
    >
      <BlurView
        intensity={backgroundBlur}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "rgba(66, 66, 66, 0.35)" },
        ]}
      />

      {size.width > 0 && size.height > 0 && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Svg width={size.width} height={size.height}>
            <Defs>
              <LinearGradient
                id="glassStroke"
                x1="33%"
                y1="0%"
                x2="67%"
                y2="100%"
              >
                <Stop
                  offset="0%"
                  stopColor="#CECECE"
                  stopOpacity={
                    size.width > 150 || size.height > 150 ? 0.55 : 0.35
                  }
                />
                <Stop offset="37%" stopColor="#646464" stopOpacity={0.15} />
                <Stop offset="69%" stopColor="#646464" stopOpacity={0.15} />
                <Stop
                  offset="100%"
                  stopColor="#CECECE"
                  stopOpacity={
                    size.width > 150 || size.height > 150 ? 0.3 : 0.55
                  }
                />
              </LinearGradient>
            </Defs>

            <Rect
              x={0.5}
              y={0.5}
              width={size.width - 1}
              height={size.height - 1}
              rx={radius}
              ry={radius}
              fill="none"
              stroke="url(#glassStroke)"
              strokeWidth={1}
            />
          </Svg>
        </View>
      )}
    </View>
  );
}
