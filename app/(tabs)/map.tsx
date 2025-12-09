import Mapbox from "@rnmapbox/maps";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MinimalMapScreen() {
  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={"mapbox://styles/whispersapp/cmivz8rvz005401s626vsgr39"}
        logoEnabled={false}
        attributionEnabled={false}
        attributionPosition={{ bottom: 0, right: 0 }}
      >
        <Mapbox.Camera zoomLevel={12} centerCoordinate={[2.3522, 48.8566]} />

        <Mapbox.PointAnnotation
          id="paris-marker"
          coordinate={[2.3522, 48.8566]}
        >
          <View className="rounded-full w-10 h-10 bg-red-500"></View>
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
