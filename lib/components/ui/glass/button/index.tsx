import React, { useState } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  PressableProps,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { styled } from "nativewind";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";

const GlassBlur = styled(BlurView);

interface GlassButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
  pressableClassName?: string;
  radius?: number;
  loading?: boolean;
}

export default function GlassButton({
  children,
  className,
  loading = false,
  radius,
  ...pressableProps
}: GlassButtonProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  function onLayout(e: LayoutChangeEvent) {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  }

  const computedRadius =
    radius !== undefined && radius !== null ? radius : size.height / 2 || 9999;

  return (
    <View className={`self-start ${className ?? ""}`}>
      <View
        style={{
          borderRadius: computedRadius,
          overflow: "hidden",
        }}
      >
        <GlassBlur
          intensity={25}
          tint="dark"
          style={{ borderRadius: computedRadius }}
        >
          <View style={styles.fill} pointerEvents="none" />

          <Pressable
            onLayout={onLayout}
            style={{ borderRadius: computedRadius }}
            disabled={pressableProps.disabled || loading}
            {...pressableProps}
          >
            {children}
          </Pressable>
        </GlassBlur>

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
                      size.width > 150 || size.height > 150 ? 0.25 : 0.35
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
                rx={computedRadius}
                ry={computedRadius}
                fill="none"
                stroke="url(#glassStroke)"
                strokeWidth={1}
              />
            </Svg>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(66, 66, 66, 0.35)",
  },
});
