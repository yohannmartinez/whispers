import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, ImageBackground } from "react-native";

export default function ImageSlider({
  images,
  imageSize,
  children,
}: {
  images: string[];
  imageSize: { width: number; height: number };
  children?: (p: { index: number }) => React.ReactNode;
}) {
  const [itemSize, setItemSize] = useState({
    width: imageSize.width,
    height: imageSize.height,
  });

  useEffect(() => {
    setItemSize({ width: imageSize.width, height: imageSize.height });
  }, [imageSize]);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        style={{
          overflow: "visible",
          width: itemSize.width,
          height: itemSize.height,
        }}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        snapToInterval={itemSize.width + 12}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.item,
              {
                backgroundColor: item,
                width: itemSize.width,
                height: itemSize.height,
                position: "relative",
              },
            ]}
            onLayout={(e) =>
              setItemSize({
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height,
              })
            }
          >
            <ImageBackground
              source={{ uri: item }}
              style={{
                width: imageSize.width,
                height: imageSize.height,
                flex: 1,
                borderRadius: 30,
                overflow: "hidden",
                position: "absolute",
              }}
            />
            {children?.({ index })}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  item: {
    borderRadius: 30,
  },
});
