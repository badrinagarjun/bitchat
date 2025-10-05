// New Chat Screen - Discover nearby Bluetooth devices

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { bluetoothMesh } from '../services/bluetoothMesh';
import { localStorage } from '../services/localStorage';
import { BluetoothDevice } from '../types';

interface NewChatScreenProps {
  navigation: any;
}

export default function NewChatScreen({ navigation }: NewChatScreenProps) {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        const allGranted = Object.values(granted).every(
          status => status === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          Alert.alert(
            'Permissions Required',
            'BitChat needs Bluetooth and Location permissions to discover nearby devices.'
          );
        }
      } catch (err) {
        console.warn('Permission error:', err);
      }
    }
  };

  const startScanning = async () => {
    setScanning(true);
    setDevices([]);

    try {
      const initialized = await bluetoothMesh.initialize();
      
      if (!initialized) {
        Alert.alert(
          'Bluetooth Not Available',
          'This feature requires a custom build. Expo Go does not support Bluetooth.\n\nTo test Bluetooth:\n1. Build APK with: eas build --platform android\n2. Install on physical device'
        );
        setScanning(false);
        return;
      }
      
      const discoveredDevices = await bluetoothMesh.startDiscovery((device) => {
        // Convert BLE Device to our BluetoothDevice type
        const bleDevice: BluetoothDevice = {
          id: device.id,
          name: device.name || 'Unknown Device',
          rssi: device.rssi || undefined,
          isConnected: false,
        };
        
        setDevices(prev => {
          // Avoid duplicates
          const exists = prev.find(d => d.id === bleDevice.id);
          if (exists) {
            return prev.map(d => d.id === bleDevice.id ? bleDevice : d);
          }
          return [...prev, bleDevice];
        });
      });

      if (discoveredDevices && discoveredDevices.length === 0) {
        Alert.alert('No Devices Found', 'Make sure other BitChat devices are nearby and have the app open.');
      }
    } catch (error) {
      console.error('Scan error:', error);
      Alert.alert('Scan Failed', 'Failed to scan for devices. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    setConnecting(device.id);
    
    try {
      await bluetoothMesh.connectToDevice(device.id);
      
      // Save as contact
      await localStorage.saveContact(device.id, device.name);
      
      // Create chat
      const chatId = `chat_${device.id}_${Date.now()}`;
      await localStorage.saveChat({
        id: chatId,
        name: device.name,
        lastMessage: 'Connected via Bluetooth',
        timestamp: new Date().toISOString(),
        unread: 0,
        deviceId: device.id,
        isConnected: true,
      });

      Alert.alert('Connected!', `You can now chat with ${device.name}`);
      navigation.goBack();
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Connection Failed', 'Could not connect to device. Please try again.');
    } finally {
      setConnecting(null);
    }
  };

  const renderDevice = ({ item }: { item: BluetoothDevice }) => (
    <TouchableOpacity
      style={styles.deviceItem}
      onPress={() => connectToDevice(item)}
      disabled={connecting !== null}
    >
      <View style={styles.deviceInfo}>
        <View style={styles.deviceIcon}>
          <Text style={styles.deviceIconText}>📱</Text>
        </View>
        <View style={styles.deviceDetails}>
          <Text style={styles.deviceName}>{item.name}</Text>
          <Text style={styles.deviceId}>ID: {item.id.slice(0, 8)}...</Text>
          {item.rssi && (
            <Text style={styles.deviceRssi}>Signal: {item.rssi} dBm</Text>
          )}
        </View>
      </View>
      
      {connecting === item.id ? (
        <ActivityIndicator color="#3a86ff" />
      ) : (
        <Text style={styles.connectButton}>Connect</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Discover Devices</Text>
        <Text style={styles.subtitle}>
          Find nearby BitChat users via Bluetooth
        </Text>

        <TouchableOpacity
          style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
          onPress={startScanning}
          disabled={scanning}
        >
          <Text style={styles.scanButtonText}>
            {scanning ? '🔍 Scanning...' : '🔎 Start Scanning'}
          </Text>
        </TouchableOpacity>

        {scanning && (
          <View style={styles.scanningIndicator}>
            <ActivityIndicator size="large" color="#3a86ff" />
            <Text style={styles.scanningText}>
              Looking for nearby devices...
            </Text>
          </View>
        )}

        <FlatList
          data={devices}
          renderItem={renderDevice}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.deviceList}
          ListEmptyComponent={
            !scanning ? (
              <Text style={styles.emptyText}>
                No devices found. Start scanning to discover nearby BitChat users.
              </Text>
            ) : null
          }
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>� Privacy First</Text>
          <Text style={styles.infoText}>
            All communication happens directly between devices via Bluetooth.
            No servers, no tracking, complete privacy.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  scanButton: {
    backgroundColor: '#3a86ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  scanButtonDisabled: {
    opacity: 0.5,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scanningIndicator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scanningText: {
    color: '#888',
    marginTop: 12,
    fontSize: 14,
  },
  deviceList: {
    paddingBottom: 20,
  },
  deviceItem: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deviceIconText: {
    fontSize: 24,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  deviceId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  deviceRssi: {
    fontSize: 12,
    color: '#aaa',
  },
  connectButton: {
    color: '#3a86ff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginTop: 40,
  },
  infoBox: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
});
