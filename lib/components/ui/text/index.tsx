import React from "react";
import { Text as RNText, TextProps } from "react-native";
import { styled } from "nativewind";

const StyledText = styled(RNText);

const sizeMap = {
  xs: "text-[12px] leading-6",
  sm: "text-[14px] leading-7",
  md: "text-[17px]",
  lg: "text-[20px]",
  xl: "text-[24px]",
  "2xl": "text-[32px] tracking-[-0.8px]",
};

interface AppTextProps extends TextProps {
  size?: keyof typeof sizeMap;
  className?: string;
  children: React.ReactNode;
}

export default function Text({
  size = "md",
  className = "",
  children,
  ...props
}: AppTextProps) {
  const sizeClass = sizeMap[size];

  return (
    <StyledText
      className={`tracking-[-0.4px] ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </StyledText>
  );
}
