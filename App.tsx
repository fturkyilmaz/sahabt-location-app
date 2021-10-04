import React from 'react';
import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import Button from './src/components/Button';

import {Colors, Images, Layout} from './src/constants';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={Images.logo}
            style={styles.image}
            resizeMethod="scale"
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            borderTopLeftRadius: 75,
            backgroundColor: Colors.cFFFFFF,
            height: Layout.height / 1.5,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Text>HELLO WORLD</Text>

          <View style={{flex: 1, margin: 50}}>
            <Button
              text="Login"
              onPress={() => console.log('Giriş Yaptımmmm')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.c90BF00,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {width: 200, height: 200},
  imageContainer: {
    paddingTop: 70,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
