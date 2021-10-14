import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Alert,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import {Colors} from '../../../constants';
import BottomSheet from '../../../components/BottomSheet';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import styles from './styles';
import GeolocationService from 'react-native-geolocation-service';
import {getUserLocation} from '../../../services/UserService';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);

  const [liveLocation, setLiveLocation] = useState<GeolocationResponse | null>(
    null,
  );

  const [liveData, setLiveData] = useState<any>([]);

  const mapMarkers = () => {
    return liveData?.length > 0
      ? liveData.map(markerData => (
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

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

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
          altitude: 100000,
          zoom: 45,
        });
      },
      error => {
        setLiveLocation(null);
        Alert.alert(`Code ${error.code} , ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
      },
    );
  };

  const closeBottomSheet = () => {
    setIsShowBottomSheet(false);
  };

  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Ayarlar açılamadı !!');
    });
  };

  const hasPermissionIOS = async () => {
    const status = await GeolocationService.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Konum izni verilmedi.');
    }

    if (status === 'disabled') {
      Alert.alert('Konum izinlerine izin vermelisiniz.'),
        '',
        [
          {text: 'Ayarlara Git', onPress: openSetting},
          {text: 'Konumu Kullanma', onPress: () => {}},
        ];
    }

    return false;
  };

  const hasPermissionAndroid = async () => {
    if (Platform.OS !== 'android') {
      return false;
    }

    if (Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Konum izniniz kapalıdır.', ToastAndroid.LONG);
    }
    if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Konum izniniz iptal etmişsiniz', ToastAndroid.LONG);
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();

      return hasPermission;
    }

    await hasPermissionAndroid();
  };

  const fetchUserLocation = async () => {
    const response = await getUserLocation();

    setLiveData(response.data);
  };

  useEffect(() => {
    fetchUserLocation();
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
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

        {liveLocation?.coords && (
          <Marker
            anchor={{x: 0.5, y: 0.6}}
            coordinate={liveLocation?.coords}
            flat>
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
