import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = (key: any, defaultValue: any) => {
    const [storageValue, updateStorageValue] = useState(defaultValue);

    async function getStorageValue() {
        let value = defaultValue;
        try {
            value = JSON.parse(await AsyncStorage.getItem(key) as any) || defaultValue;
        } catch (e) {
        } finally {
            updateStorageValue(value);
        }
    }

    async function updateStorage(newValue: any) {
        try {
            if (newValue === null) {
                await AsyncStorage.removeItem(key);
            } else {
                const value = JSON.stringify(newValue);
                await AsyncStorage.setItem(key, value);
            }
        } catch (e) {
        } finally {
            updateStorageValue(newValue);
        }
    }

    useEffect(() => {
        getStorageValue();
    }, []);

    return [storageValue, updateStorage];
};

async function saveValue(key: string, value: any) {
    try {
        await AsyncStorage.setItem(key, value);
        return { success: true };
    } catch (e) {
        console.log('LOG_Async Storage access Failed', e);
        return { error: e, success: false };
    }
}


async function getValue(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        console.log('LOG_Async Storage access Failed', e);
        return false;
    }
}

async function removeValue(key: string) {
    try {
        await AsyncStorage.removeItem(key);
        return { success: true };
    } catch (e) {
        console.log('LOG_Async Storage access Failed', e);
        return { error: e };
    }
}


async function clearAll() {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log('LOG_Async Storage access Failed', e);
    }
}

export default {
    get: getValue,
    save: saveValue,
    useStorage: useStorage,
    remove: removeValue,
    clearAll: clearAll
};