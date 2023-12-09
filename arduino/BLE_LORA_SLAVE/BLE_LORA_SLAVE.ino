#include <SoftwareSerial.h>

#define MAX_DATA_LENGTH 50

SoftwareSerial Lora(2, 3);
SoftwareSerial HM10(4,5);


String lora_RX_address = "1";   //enter Lora RX address
char appData[MAX_DATA_LENGTH];

String inData = "";
void setup()
{
  Serial.begin(9600);
  Lora.begin(9600);
  HM10.begin(9600);
    // HM10.print("AT");

  HM10.print("Connection Established");
  
}

void loop()
{
  readBluetoothData();
  sendLoraData(inData);
  delay(1000);

if(inData=="Light: true"){
clearLoraData();
}
if(inData=="Light: false"){
clearLoraData();
}
if(inData=="Sound: true"){
clearLoraData();
}
if(inData=="Sound: false"){
clearLoraData();
}
}

void readBluetoothData(){
  HM10.listen();
  if(HM10.available())
  {
     HM10.readBytesUntil('\n', appData, MAX_DATA_LENGTH - 1);  // Read bytes into the char array
    appData[MAX_DATA_LENGTH - 1] = '\0';  // Null-terminate the char array
    delay(10);
    inData= appData;  // save the data in string format
    Serial.write(appData);
    
  }
}
void sendLoraData(const String& data){
    Lora.println("AT+SEND=" + lora_RX_address+","+data.length()+"," + data); 

}
void clearLoraData(){
  inData="";
}
void writeBluetoothData(const String& data){

HM10.println("data"+data);
}





