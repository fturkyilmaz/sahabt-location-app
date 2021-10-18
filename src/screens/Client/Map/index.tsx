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
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {LatLng, Marker, Polyline} from 'react-native-maps';
import {Colors} from '../../../constants';
import BottomSheet from '../../../components/BottomSheet';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import styles from './styles';
import GeolocationService from 'react-native-geolocation-service';
import {getUserLocation} from '../../../services/UserService';
import {IUserLocationResponse} from '../../../services/types';
import Button from '../../../components/Button';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);

  const [polylineCoordinates, setPolylineCoordinate] = useState<LatLng[]>([]);

  const [markerDetail, setMarketDetail] =
    useState<IUserLocationResponse | null>(null);

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
            onPress={() => markerClick(markerData)}
          />
        ))
      : null;
  };

  const markerClick = (detail: IUserLocationResponse) => {
    console.warn(JSON.stringify(detail));

    setMarketDetail(detail);

    showBottomSheet();
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

  const showBottomSheet = () => {
    setIsShowBottomSheet(true);
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

  const zoomDelta = 0.002;

  const onZoom = (zoomSign: number) => {
    if (liveLocation?.coords) {
      const {coords} = liveLocation;

      const zoomedRegion = {
        ...coords,
        latitudeDelta: zoomDelta * zoomSign,
        longitudeDelta: zoomDelta * zoomSign,
      };

      mapRef.current!.animateToRegion(zoomedRegion);
    }
  };

  const onZoomIn = () => {
    onZoom(3);
  };

  // Fix IT Zoom out problem !!!

  const onZoomOut = () => {
    onZoom(1);
  };

  const navigateLocation = (navigateParams: LatLng | null) => {
    if (navigateParams?.latitude && navigateParams?.longitude) {
      if (liveLocation?.coords) {
        const liveCoord: LatLng = {
          latitude: liveLocation.coords?.latitude,
          longitude: liveLocation.coords?.longitude,
        };

        const results = [liveCoord, navigateParams];

        setPolylineCoordinate(results);

        closeBottomSheet();
      }
    }
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
        paddingAdjustmentBehavior="automatic"
        showsMyLocationButton={true}
        showsBuildings={true}
        maxZoomLevel={17.5}
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

        {polylineCoordinates?.length > 1 && (
          <Polyline
            testID="routePoly"
            coordinates={polylineCoordinates}
            strokeWidth={5}
            strokeColor={Colors.c90BF00}
          />
        )}
      </MapView>
      <View style={styles.zoomContainer}>
        <TouchableOpacity style={styles.button} onPress={onZoomIn}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.button} onPress={onZoomOut}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        visible={isShowBottomSheet}
        onRequestClose={() => closeBottomSheet()}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: markerDetail?.image}}
            style={styles.image}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.text}>{markerDetail?.location}</Text>

          <Text style={styles.description}>{markerDetail?.comments}</Text>
        </View>

        {markerDetail && (
          <Button
            text="Konuma Git"
            onPress={() =>
              navigateLocation({
                latitude: markerDetail?.latitude,
                longitude: markerDetail?.longitude,
              })
            }
          />
        )}
      </BottomSheet>
    </View>
  );
}
