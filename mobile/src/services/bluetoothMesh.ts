// Bluetooth Mesh Service - Pure P2P Networking
// No backend needed!

import { BleManager, Device, Characteristic } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';

// UUID for BitChat service
const BITCHAT_SERVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
const MESSAGE_CHARACTERISTIC_UUID = '0000fff1-0000-1000-8000-00805f9b34fb';

class BluetoothMeshService {
  private bleManager: BleManager;
  private connectedDevices: Map<string, Device>;
  private discoveredDevices: Device[];
  private isScanning: boolean;

  constructor() {
    this.bleManager = new BleManager();
    this.connectedDevices = new Map();
    this.discoveredDevices = [];
    this.isScanning = false;
  }

  // Initialize Bluetooth
  async initialize(): Promise<boolean> {
    try {
      const state = await this.bleManager.state();
      console.log('Bluetooth state:', state);

      if (state !== 'PoweredOn') {
        console.warn('Bluetooth is not powered on');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Failed to initialize Bluetooth:', error);
      return false;
    }
  }

  // Start discovering nearby devices
  async startDiscovery(onDeviceFound: (device: Device) => void): Promise<Device[]> {
    if (this.isScanning) {
      console.log('Already scanning...');
      return this.discoveredDevices;
    }

    this.isScanning = true;
    this.discoveredDevices = [];

    console.log('Starting device discovery...');

    this.bleManager.startDeviceScan(
      null, // Scan for all devices
      { allowDuplicates: false },
      (error, device) => {
        if (error) {
          console.error('Scan error:', error);
          return;
        }

        if (device && device.name && device.name.includes('BitChat')) {
          console.log('Found BitChat device:', device.name, device.id);
          
          // Check if already discovered
          if (!this.discoveredDevices.find(d => d.id === device.id)) {
            this.discoveredDevices.push(device);
            onDeviceFound(device);
          }
        }
      }
    );

    // Stop scanning after 30 seconds
    setTimeout(() => {
      this.stopDiscovery();
    }, 30000);

    // Return discovered devices after scanning
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.discoveredDevices);
      }, 30000);
    });
  }

  // Stop discovering devices
  stopDiscovery(): void {
    if (this.isScanning) {
      this.bleManager.stopDeviceScan();
      this.isScanning = false;
      console.log('Stopped device discovery');
    }
  }

  // Connect to a device
  async connectToDevice(deviceId: string): Promise<boolean> {
    try {
      // Find the device from discovered devices
      const device = this.discoveredDevices.find(d => d.id === deviceId);
      if (!device) {
        console.error('Device not found in discovered devices');
        return false;
      }

      console.log('Connecting to device:', device.name);

      const connectedDevice = await device.connect();
      await connectedDevice.discoverAllServicesAndCharacteristics();

      this.connectedDevices.set(device.id, connectedDevice);
      console.log('Connected to:', device.name);

      // Setup disconnect listener
      connectedDevice.onDisconnected((error, disconnectedDevice) => {
        console.log('Device disconnected:', disconnectedDevice?.name);
        this.connectedDevices.delete(device.id);
      });

      return true;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  }

  // Send message to a device
  async sendMessage(deviceId: string, message: string): Promise<boolean> {
    try {
      const device = this.connectedDevices.get(deviceId);
      if (!device) {
        console.error('Device not connected');
        return false;
      }

      // Encode message to base64
      const base64Message = Buffer.from(message).toString('base64');

      // Write to characteristic
      await device.writeCharacteristicWithResponseForService(
        BITCHAT_SERVICE_UUID,
        MESSAGE_CHARACTERISTIC_UUID,
        base64Message
      );

      console.log('Message sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  // Listen for incoming messages
  async startListening(
    deviceId: string,
    onMessageReceived: (message: string) => void
  ): Promise<void> {
    try {
      const device = this.connectedDevices.get(deviceId);
      if (!device) {
        console.error('Device not connected');
        return;
      }

      // Subscribe to characteristic notifications
      device.monitorCharacteristicForService(
        BITCHAT_SERVICE_UUID,
        MESSAGE_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.error('Monitor error:', error);
            return;
          }

          if (characteristic?.value) {
            // Decode message from base64
            const message = Buffer.from(characteristic.value, 'base64').toString();
            console.log('Message received:', message);
            onMessageReceived(message);
          }
        }
      );

      console.log('Started listening for messages');
    } catch (error) {
      console.error('Failed to start listening:', error);
    }
  }

  // Disconnect from a device
  async disconnectDevice(deviceId: string): Promise<void> {
    try {
      const device = this.connectedDevices.get(deviceId);
      if (device) {
        await device.cancelConnection();
        this.connectedDevices.delete(deviceId);
        console.log('Disconnected from device');
      }
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  }

  // Get list of connected devices
  getConnectedDevices(): Device[] {
    return Array.from(this.connectedDevices.values());
  }

  // Get list of discovered devices
  getDiscoveredDevices(): Device[] {
    return this.discoveredDevices;
  }

  // Cleanup
  destroy(): void {
    this.stopDiscovery();
    this.connectedDevices.forEach((device) => {
      device.cancelConnection();
    });
    this.connectedDevices.clear();
    this.bleManager.destroy();
  }
}

// Singleton instance
export const bluetoothMesh = new BluetoothMeshService();

export default BluetoothMeshService;
