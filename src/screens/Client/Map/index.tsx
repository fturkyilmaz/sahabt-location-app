import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import {Colors} from '../../../constants';
import LiveData from '../../../utils/data';
import BottomSheet from '../../../components/BottomSheet';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import styles from './styles';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);

  const [liveLocation, setLiveLocation] = useState<GeolocationResponse | null>(
    null,
  );

  const mapMarkers = () => {
    return LiveData?.length > 0
      ? LiveData.map(markerData => (
          <Marker
            key={markerData.id}
            coordinate={{
              latitude: markerData.latitude,
              longitude: markerData.longitude,
              latitudeDelta: 0.2922,
              longitudeDelta: 0.1421,
            }}
          />
        ))
      : null;
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLiveLocation(position);

        mapRef?.current?.animateCamera({
          center: {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 10000,
          zoom: 45,
        });

        console.warn(JSON.stringify(position, null, 4));
      },
      error => {
        console.warn(error);
      },
    );
  };

  const closeBottomSheet = () => {
    setIsShowBottomSheet(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        loadingEnabled
        initialRegion={{
          latitude: 41.015137,
          longitude: 28.97953,
          latitudeDelta: 0.2922,
          longitudeDelta: 0.1421,
        }}
        style={StyleSheet.absoluteFillObject}>
        {mapMarkers()}
        {liveLocation && (
          <Marker anchor={{x: 0.5, y: 0.6}} coordinate={liveLocation} flat>
            <View style={styles.dotContainer}>
              <View style={styles.arrow} />
              <View style={styles.dot} />
            </View>
          </Marker>
        )}
        <Circle
          center={liveLocation}
          strokeColor={Colors.c90BF00}
          fillColor={Colors.c7c7e80}
        />
      </MapView>
      <BottomSheet
        visible={isShowBottomSheet}
        onRequestClose={() => closeBottomSheet()}>
        <Text>CHİLDRENIMI AYARLAYACAGIM</Text>
      </BottomSheet>
    </View>
  );
}
