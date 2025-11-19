import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  PressableProps,
} from "react-native";

type Variant = "primary" | "secondary" | "outline";

type ButtonProps = {
  title: string;
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
} & PressableProps;

export function Button({
  title,
  variant = "primary",
  loading = false,
  disabled,
  fullWidth = true,
  className,
  ...rest
}: ButtonProps) {
  const baseClasses =
    "flex-row items-center justify-center rounded-xl px-4 py-3 active:opacity-80";

  const variantClasses: Record<Variant, string> = {
    primary: "bg-blue-600",
    secondary: "bg-neutral-800",
    outline: "border border-blue-600 bg-transparent",
  };

  const textVariantClasses: Record<Variant, string> = {
    primary: "text-white",
    secondary: "text-white",
    outline: "text-blue-600",
  };

  return (
    <Pressable
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-20 cursor-disabled" : ""}
        ${loading ? "cursor-disabled" : ""}
        ${className ?? ""}
      `}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? "#2563eb" : "#ffffff"}
        />
      ) : (
        <Text
          className={`
            font-semibold text-base
            ${textVariantClasses[variant]}
          `}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
