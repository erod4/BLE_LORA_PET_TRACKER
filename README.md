# BLE LoRa - Dog Tracker App

## Overview
The Dog Tracker App is a React Native application designed for pet owners who enjoy hiking with their dogs in remote areas. This IoT-based solution enables real-time GPS tracking of your dog without needing an internet connection. The system uses an ESP32 module to communicate with an Arduino via LoRa technology, receiving GPS coordinates which are then relayed to an iPhone app. Additional features include remotely controlled lighting and a buzzer for increased visibility and recall assistance.

## Features
- **Real-Time GPS Tracking:** Display your dog's location in real-time on your iPhone, ideal for areas without cellular coverage.
- **Remote Light Control:** Turn on a light attached to your dog's collar for visibility during night hikes.
- **Buzzer for Recall:** Activate a buzzer to recall your dog or to signal when your dog is nearby.

## Components
- React Native application for iOS.
- ESP-WROOM-32 for wireless communication.
- Arduino Uno with GPS NEO-6M module for acquiring location data.
- 2 REYAX RYLR998 LoRa modules for long-range, low-power communication (These modules will need to be configured before usage).
- LED light and passive buzzer for visibility and signaling .

## Setup and Installation

### Requirements
- Node.js and npm/yarn.
- React Native environment.
- Arduino IDE.
- ESP32 and Arduino hardware.

### Installing Dependencies
```bash
git clone https://github.com/erod4/BLE_LORA_PET_TRACKER
cd BLE_LORA_PET_TRACKER
npm install
```
## Hardware Setup
Follow these steps to set up the hardware for the Dog Tracker App:

1. **Assemble the Components:**
   - Connect the ESP32, Arduino, GPS module, LoRa module, LED light, and buzzer as per the circuit diagram provided in the `/hardware` directory.

2. **Upload the Arduino Sketch:**
   - Upload the code located in /arduino labeled GPS_LORA_MASTER to the arduino (disconnect rx/tx before upload).

3. **Configure the ESP32 Module:**
   - Upload the code located in /arduino labeled BLE_LORA_SLAVE to the ESP32.

## Usage
To use the Dog Tracker App, perform the following steps:

1. **Power On the Hardware:**
   - Ensure that the hardware setup attached to your dog's collar is powered on.

2. **Open the App:**
   - Launch the Dog Tracker App on your iPhone.

3. **Connect to ESP32:**
   - Wait for the app to display the ESP32 as connectable.
   - Connect to the ESP32 via Bluetooth to start receiving real-time location data.

4. **Control the Light and Buzzer:**
   - Use the in-app buttons to remotely control the light and buzzer on your dog's collar.

5. **Adjust Bluetooth Settings (if necessary):**
   - You may need to modify the Bluetooth settings on your iPhone to always allow connections for uninterrupted tracking.
