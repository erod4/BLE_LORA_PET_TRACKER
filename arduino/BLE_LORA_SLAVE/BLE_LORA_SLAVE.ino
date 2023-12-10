#include <SoftwareSerial.h>

#define MAX_DATA_LENGTH 50

SoftwareSerial Lora(2, 3);
SoftwareSerial HM10(4,5);

String incomingString;
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
  readLoraData();
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

void readLoraData()
{
   if(Lora.available())
    {
        //read incoming string from slave module
        incomingString=Lora.readString();
        //print incoming string to serial monitor
        Serial.println(incomingString);
        
        //splitting data from message format
        char dataArray[30];
        incomingString.toCharArray(dataArray,30);
        char* data=strtok(dataArray,",");
        data=strtok(NULL,",");
        data=strtok(NULL,",");
        Serial.println(data);
        //actual condition is in data

        //compare the condition
        //strcmp returns 0 if true
        if(strcmp(data,"Light: true")==0)
        {
            //turn light on
        }
         if(strcmp(data,"Light: false")==0)
        {
            //turn light off
        }
         if(strcmp(data,"Sound: true")==0)
        {
            //sound recall
            //react native app automatically dispatches sound false after 5 seconds 
        }

    }
}



