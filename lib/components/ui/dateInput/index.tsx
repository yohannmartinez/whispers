import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInput as RNTextInput,
} from "react-native";

type DateDigits = {
  day: string;
  month: string;
  year: string;
};

type Props = {
  onChange?: (value: DateDigits, isValid: boolean) => void;
  onComplete?: (value: DateDigits) => void;
  defaultValue?: string;
  maxYear?: number;
};

const TOTAL = 8;

const timestampDateToArray = (value: string): string[] => {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return [...day, ...month, ...year];
};

export default function DateInput({
  onChange,
  onComplete,
  defaultValue,
  maxYear,
}: Props) {
  const [digits, setDigits] = useState<string[]>(() => Array(TOTAL).fill(""));
  const [isDateWrong, setIsDateWrong] = useState<boolean>(false);
  const refs = useRef<(RNTextInput | null)[]>([]);
  const hasInitializedFromDefault = useRef(false);

  const update = (nextDigits: string[]) => {
    const value = {
      day: nextDigits.slice(0, 2).join(""),
      month: nextDigits.slice(2, 4).join(""),
      year: nextDigits.slice(4).join(""),
    };

    setIsDateWrong(false);
    const isDateComplete =
      value.day.length === 2 &&
      value.month.length === 2 &&
      value.year.length === 4;

    if (isDateComplete) {
      const day = parseInt(value.day, 10);
      const month = parseInt(value.month, 10);
      const year = parseInt(value.year, 10);

      const date = new Date(year, month - 1, day);
      const isValidDate =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

      const isMaxYearExceeded = maxYear ? year >= maxYear : false;

      setIsDateWrong(!isValidDate || isMaxYearExceeded);

      if (!isValidDate) {
        return;
      }

      onComplete?.(value);
    }

    onChange?.(value, !isDateWrong && isDateComplete);
  };

  useEffect(() => {
    if (!defaultValue) return;
    if (hasInitializedFromDefault.current) return;

    const userHasTypedSomething = digits.some((d) => d !== "");
    if (userHasTypedSomething) return;

    const initialDigits = timestampDateToArray(defaultValue);
    setDigits(initialDigits);
    update(initialDigits);
    hasInitializedFromDefault.current = true;

    const lastIndex = initialDigits.findLastIndex((d) => d !== "");
    if (lastIndex >= 0 && lastIndex < TOTAL - 1) {
      refs.current[lastIndex + 1]?.focus();
    }
  }, [defaultValue]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    update(next);

    if (digit && index < TOTAL - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: any, index: number) => {
    if (e.nativeEvent.key !== "Backspace") return;

    const next = [...digits];

    if (next[index] !== "") {
      next[index] = "";
      setDigits(next);
      update(next);
      return;
    }

    if (index > 0) {
      next[index - 1] = "";
      setDigits(next);
      update(next);
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex flex-row w-full justify-between items-end gap-3">
      {Array.from({ length: TOTAL }).map((_, i) => {
        const extraSpacing = i === 1 || i === 3;

        return (
          <React.Fragment key={i}>
            <View className="flex-1 flex flex-row">
              <TextInput
                ref={(el) => {
                  refs.current[i] = el;
                }}
                value={digits[i]}
                onChangeText={(text) => handleChange(text, i)}
                onKeyPress={(e) => handleBackspace(e, i)}
                keyboardType="number-pad"
                maxLength={1}
                style={[
                  styles.input,
                  isDateWrong && { borderBottomColor: "red", color: "red" },
                ]}
                textAlign="center"
              />
            </View>
            {extraSpacing && <View className="w-4" />}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontWeight: "500",
    width: "100%",
    paddingVertical: 10,
    fontSize: 30,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});
