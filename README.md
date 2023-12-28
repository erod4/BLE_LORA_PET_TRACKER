# BLE_LORA_PET_TRACKER
Dog Tracker App
Overview
The Dog Tracker App is a React Native application designed for pet owners who enjoy hiking with their dogs in remote areas. This IoT-based solution allows for real-time GPS tracking of your dog without the need for an internet connection. The system uses an ESP32 module to communicate with an Arduino via LoRa technology, receiving GPS coordinates which are then relayed to an iPhone app. Additional features include remotely controlled lighting and a buzzer for increased visibility and recall assistance.

Features
Real-Time GPS Tracking: Display your dog's location in real-time on your iPhone, ideal for areas without cellular coverage.
Remote Light Control: Turn on a light attached to your dog's collar for visibility during night hikes.
Buzzer for Recall: Activate a buzzer to recall your dog or to signal when your dog is nearby.
Components
React Native application for iOS.
ESP32 module for wireless communication.
Arduino with GPS module for acquiring location data.
LoRa module for long-range, low-power communication.
LED light and buzzer for visibility and signaling.

Certainly! Below is a template for a README file for your React Native project, which interfaces with an ESP32 and Arduino for tracking a dog during hikes. This template provides a general outline and can be modified to include more specific details about your project.

Dog Tracker App
Overview
The Dog Tracker App is a React Native application designed for pet owners who enjoy hiking with their dogs in remote areas. This IoT-based solution allows for real-time GPS tracking of your dog without the need for an internet connection. The system uses an ESP32 module to communicate with an Arduino via LoRa technology, receiving GPS coordinates which are then relayed to an iPhone app. Additional features include remotely controlled lighting and a buzzer for increased visibility and recall assistance.

Features
Real-Time GPS Tracking: Display your dog's location in real-time on your iPhone, ideal for areas without cellular coverage.
Remote Light Control: Turn on a light attached to your dog's collar for visibility during night hikes.
Buzzer for Recall: Activate a buzzer to recall your dog or to signal when your dog is nearby.
Components
React Native application for iOS.
ESP32 module for wireless communication.
Arduino with GPS module for acquiring location data.
LoRa module for long-range, low-power communication.
LED light and buzzer for visibility and signaling.
Setup and Installation
Requirements
Node.js and npm/yarn
React Native environment
Arduino IDE
ESP32 and Arduino hardware setup
Installing Dependencies

1. Clone the repository:
   git clone https://github.com/erod4/BLE_LORA_PET_TRACKER
2. Navigate to the project directory and install dependencies:
   cd BLE_LORA_PET_TRACKER
   npm install
Hardware Setup
1. Assemble the ESP32, Arduino, GPS module, LoRa module, LED light, and buzzer as per the circuit diagram provided in /hardware.
2. Upload the provided Arduino sketch to the Arduino board.
3. Configure the ESP32 module using the instructions in /arduino.
Usage
1. Power on the hardware setup attached to your dog's collar.
2. Open the Dog Tracker App on your iPhone.
3. The app will display  the ESP32 once it's connectable, connect to the ESP32 via Bluetooth and display real-time location data.
4. Use the in-app buttons to control the light and buzzer.
5. You may need to change bluetooth settings to always allow.
Feel free to adjust the README to fit the specifics of your project, including adding or modifying sections as needed. For example, if your project has a specific setup process for the React Native development environment or detailed hardware assembly instructions, you should include those details. 
