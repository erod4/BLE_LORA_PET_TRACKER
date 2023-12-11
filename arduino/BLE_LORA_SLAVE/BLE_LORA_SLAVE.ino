#include <SoftwareSerial.h>
#define MAX_DATA_LENGTH 50

//BLE
SoftwareSerial HM10(4,5);
String inData="";
String writeData="";
char appData[MAX_DATA_LENGTH];
//LoRa
SoftwareSerial Lora(2,3);
String lora_RX_address="1";
String incomingString ="";
/////////////////////////////





void setup() {
HM10.begin(9600);
Serial.begin(9600);
Lora.begin(9600);



}

void loop() {
  writeBleData(writeData);
  readLoraData();
}

void readLoraData(){
  //lora is listening
  incomingString=Lora.readString();

  Serial.println(incomingString);
 String coords = extractValues(incomingString);
  
 writeData=coords;
}

void readBleData()
{
  HM10.readBytesUntil("\n", appData, MAX_DATA_LENGTH-1);
  appData[MAX_DATA_LENGTH-1]="\0";
  delay(10);
  inData=appData;
  Serial.write(appData);

}
void writeBleData(const String& data){
  HM10.print(data);
  writeData="";
}

String extractValues(String input) {
  // Find the position of the first and last comma
  int firstCommaPos = input.indexOf(',');
  int lastCommaPos = input.lastIndexOf(',');

  // Check if both commas are found
  if (firstCommaPos != -1 && lastCommaPos != -1) {
    // Extract the substring between the first and last comma
    String result = input.substring(firstCommaPos + 1, lastCommaPos);
    
    return result;
  } else {
    // Handle the case when either the first or last comma is not found
    return "0 0";
  }
}