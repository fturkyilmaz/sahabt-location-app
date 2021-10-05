import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MapView
        loadingEnabled
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}
