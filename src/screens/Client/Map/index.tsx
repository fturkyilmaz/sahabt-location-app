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
import {Colors, Layout} from '../../../constants';
import BottomSheet from '../../../components/BottomSheet';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import styles from './styles';
import GeolocationService from 'react-native-geolocation-service';
import {
  getUserLocation,
  getUserLocationById,
  saveLiveLocation,
  saveUserLocation,
  updateLiveLocation,
} from '../../../services/UserService';
import {IUserLocationResponse} from '../../../services/types';
import Button from '../../../components/Button';
import MapViewDirections from 'react-native-maps-directions';
import {GetUserSelector} from '../../../redux/system/selectors';
import HttpStatusCode from '../../../utils/StatusCode';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);

  const [polylineCoordinates, setPolylineCoordinate] = useState<LatLng[]>([]);

  const [markerDetail, setMarketDetail] =
    useState<IUserLocationResponse | null>(null);

  const [liveLocation, setLiveLocation] = useState<GeolocationResponse | null>(
    null,
  );

  const [zoom, setZoom] = useState(100000);

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
    setMarketDetail(detail);

    showBottomSheet();
  };

  const saveUserLocationHandle = async ({latitude, longitude}: LatLng) => {
    if (longitude && latitude) {
      const request = {
        id: userInfo.id,
        time: new Date(),
        size: 125,
        city: 'İstanbul',
        location: `${userInfo.name} ${userInfo.fullName}`,
        latitude,
        longitude,
        comments: 'AKASYA AVM',
        created_at: new Date(),
        updated_at: new Date(),
        image:
          'https://robohash.org/consequunturmolestiasaut.png?size=150x150&set=set1',
      };

      // console.log('JSON', JSON.stringify(request));

      const response = await saveLiveLocation(request);

      // console.log('saveUserLocationHandle', response);

      return response;
    }
  };

  const updateUserLocationHandle = async ({latitude, longitude}: LatLng) => {
    if (longitude && latitude) {
      const request = {
        id: userInfo.id,
        time: new Date(),
        size: 125,
        city: 'İstanbul',
        location: `${userInfo.name} ${userInfo.fullName}`,
        latitude,
        longitude,
        comments: 'AKASYA AVM',
        created_at: new Date(),
        updated_at: new Date(),
        image:
          'https://robohash.org/consequunturmolestiasaut.png?size=150x150&set=set1',
      };

      // console.log('JSON', JSON.stringify(request));

      const response = await updateLiveLocation(request);

      // console.log('saveUserLocationHandle', response);

      return response;
    }
  };

  const isAnyLiveLocation = async (): Promise<boolean> => {
    const response = await getUserLocationById({id: userInfo.id});

    const isAny = response.status === HttpStatusCode.OK;

    return isAny;
  };

  const getLocation = async () => {
    try {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          if (position?.coords) {
            setLiveLocation(position);

            const {latitude, longitude} = position?.coords;

            isAnyLiveLocation()
              .then(isAnyUser => {
                if (isAnyUser) {
                  updateUserLocationHandle({
                    latitude,
                    longitude,
                  }).then(() => {
                    mapRef?.current?.animateCamera({
                      center: {
                        latitude,
                        longitude,
                      },
                      pitch: 0,
                      heading: 0,
                      altitude: 100000,
                      zoom: 45,
                    });
                  });
                }
              })
              .catch(() => {
                saveUserLocationHandle({latitude, longitude}).then(() => {
                  mapRef?.current?.animateCamera({
                    center: {
                      latitude,
                      longitude,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 100000,
                    zoom: 45,
                  });
                });
              });
          }
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
    } catch (error) {
      console.warn(error);
    }
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
      ToastAndroid.show('Konum iznini iptal etmişsiniz', ToastAndroid.LONG);
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();

      return hasPermission;
    }

    return await hasPermissionAndroid();
  };

  const fetchUserLocation = async () => {
    const response = await getUserLocation();

    setLiveData(response.data);
  };

  const zoomDelta = 10000;

  const onZoom = (zoomSign = zoomDelta) => {
    mapRef?.current?.getCamera().then(cam => {
      cam.altitude = zoomSign;

      console.log('CAMARE', JSON.stringify(cam, null, 4));

      mapRef?.current?.animateCamera(cam);
    });

    // if (liveLocation?.coords) {
    //   const {coords} = liveLocation;
    //   const zoomedRegion = {
    //     ...coords,
    //     latitudeDelta: zoomDelta * zoomSign,
    //     longitudeDelta: zoomDelta * zoomSign,
    //   };
    //   mapRef.current!.animateToRegion(zoomedRegion);
    // }
  };

  const onZoomIn = () => {
    const newZoom = zoom - 10000;

    setZoom(newZoom);

    onZoom(15000);
  };

  // Fix IT Zoom out problem !!!

  const onZoomOut = () => {
    setZoom(10000);

    onZoom(10000);
  };

  const googleMapOpenUrl = async ({latitude, longitude}: LatLng) => {
    await Linking.openURL(
      `https://maps.google.com/maps?daddr=${latitude},${longitude}`,
    );
  };

  const appleMapOpenUrl = async ({latitude, longitude}: LatLng) => {
    await Linking.openURL(
      `https://maps.apple.com/maps?daddr=${latitude},${longitude}`,
    );
  };

  const navigateLocation = async (navigateParams: LatLng | null) => {
    if (navigateParams?.latitude && navigateParams?.longitude) {
      if (liveLocation?.coords) {
        const liveCoord: LatLng = {
          latitude: liveLocation.coords?.latitude,
          longitude: liveLocation.coords?.longitude,
        };

        const results = [liveCoord, navigateParams];

        setPolylineCoordinate(results);

        closeBottomSheet();

        switch (Platform.OS) {
          case 'ios':
            await appleMapOpenUrl(navigateParams);
            break;

          case 'android':
            await googleMapOpenUrl(navigateParams);
            break;

          default:
            break;
        }
      }
    }
  };

  const userInfo = GetUserSelector();

  // const saveUserLocationHandle = async ({longitude, latitude}: LatLng) => {
  //   if (longitude && latitude) {
  //     const request = {
  //       id: userInfo.id,
  //       time: new Date(),
  //       city: 'Kadıköy',
  //       size: 125,
  //       location: `${userInfo.name} ${userInfo.lastName}`,
  //       latitude,
  //       longitude,
  //       comments: 'AKASYA AVM',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       image:
  //         'https://robohash.org/consequunturmolestiasaut.png?size=150x150&set=set1',
  //     };

  //     const response = await saveUserLocation(request);

  //     console.log('RESPO', response);
  //   }
  // };

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
        maxZoomLevel={11}
        style={{
          zIndex: 54435,
          width: Layout.width,
          height: Layout.height,
          ...StyleSheet.absoluteFillObject,
        }}>
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

        <MapViewDirections
          apikey="AIzaSyAbF8pI7A4rz06kZmQX1SqJQcTTnCf9AKI"
          origin={polylineCoordinates[0]}
          destination={polylineCoordinates[1]}
          strokeWidth={5}
          strokeColor={Colors.c90BF00}
        />
      </MapView>

      {Platform.OS === 'ios' && (
        <View style={styles.zoomContainer}>
          <TouchableOpacity style={styles.button} onPress={onZoomIn}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.button} onPress={onZoomOut}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
        </View>
      )}

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
            onPress={async () =>
              await navigateLocation({
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
