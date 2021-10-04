import { Platform, PixelRatio } from 'react-native';
import Layout from './Layout';

const SCREEN_WIDTH = Math.round(Layout.width);

const scale = SCREEN_WIDTH / 414;

const normalize = (size: number) => {
    const newSize = size * scale;

    return Platform.OS === 'ios'
        ? Math.round(PixelRatio.roundToNearestPixel(newSize))
        : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
};

export default normalize;
