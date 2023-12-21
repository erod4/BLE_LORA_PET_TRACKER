#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <HardwareSerial.h>
#include <BLE2902.h>  


#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define GPS_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define LIGHT_BUZZER_UUID "2d8957fe-e927-49e0-9c9a-c4d2dde04df1"
#define LORA_SERIAL_RX 16 
#define LORA_SERIAL_TX 17 
HardwareSerial LoRaSerial(2);
//for gps data
BLECharacteristic *pCharacteristic;
//for light and buzzer
BLECharacteristic *qCharacteristic;
BLEServer *pServer = nullptr;
//==================================================================
//write to LoRa
//==================================================================
void writeLoRa(const String &data )
{
   Serial.println(data);

    // Convert the length of data to a String
    String dataLength = String(data.length());

    // Correctly concatenate the command
    String command = "AT+SEND=1,11,HelloWorld";

    LoRaSerial.println(command);
}
//============================================================
//call back class is triggered on connect and disconnect
//============================================================
class ServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) override {
        // Handle connection event
    }

    void onDisconnect(BLEServer* pServer) override {
        BLEDevice::startAdvertising(); // Restart advertising
    }
};
//============================================================
//call back class is triggered when there's a write operation
//============================================================
class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *characteristic) {
        std::string value = characteristic->getValue();

        if (value.length() > 0) {
            Serial.println("Data received on BLE, forwarding to LoRa:");
            // Print the value for debugging purposes
           
            
            // Forward the data to LoRa
            writeLoRa(String(value.c_str()));
        }
    }
};

//=================================================================
void setup() {
//==================================================================
//LoRa initialization
//==================================================================
  Serial.begin(9600);
  LoRaSerial.begin(9600, SERIAL_8N1, LORA_SERIAL_RX, LORA_SERIAL_TX);  // Initialize LoRa Serial with proper pins

//==================================================================
//BLE initialization
//==================================================================
  BLEDevice::init("MyESP32");
  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);
  qCharacteristic=pService->createCharacteristic(LIGHT_BUZZER_UUID, BLECharacteristic::PROPERTY_WRITE);
  pCharacteristic = pService->createCharacteristic(
                          GPS_UUID,
                          BLECharacteristic::PROPERTY_READ |
                          
                          BLECharacteristic::PROPERTY_NOTIFY  // Add NOTIFY property
                      );


  BLE2902 *pBLE2902 = new BLE2902();
  BLE2902 *qBLE2902=new BLE2902();

  pBLE2902->setNotifications(true);
  qBLE2902->setNotifications(true);

  pCharacteristic->addDescriptor(pBLE2902);
  qCharacteristic->addDescriptor(qBLE2902);
  qCharacteristic->setCallbacks(new MyCallbacks());

  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("Characteristic defined! Now you can read it in your phone!");
//==================================================================
}

void loop() {
  // Check for data from LoRa
  if (LoRaSerial.available()) {
    String loraData = LoRaSerial.readString();
    Serial.println("Received LoRa data: " + loraData);

    // Check if there are any connected BLE clients
    if (pServer->getConnectedCount() > 0) {
      pCharacteristic->setValue(loraData.c_str());
      pCharacteristic->notify();  // Use notify to send the data
    }
  }

  delay(1000);  // Adjust delay as needed
}