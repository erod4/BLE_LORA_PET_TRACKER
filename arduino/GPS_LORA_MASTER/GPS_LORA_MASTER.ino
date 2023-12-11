#include <SoftwareSerial.h>
#include <Adafruit_GPS.h>

#define BAUD 9600
///rx=10 tx=11

String lora_RX_address = "1";   //enter Lora RX address
 char c;
String incomingString;
//lora software serial instance 
SoftwareSerial LORA(2,3);
SoftwareSerial GPS(10,11);
Adafruit_GPS AGPS(&GPS);
float lat;
float lon;

void setup()
{
    //Baud set to 9600
    Serial.begin(BAUD);
    LORA.begin(BAUD);
    AGPS.begin(BAUD);
    AGPS.sendCommand("MPTK_SET_NMEA_OUTPUT_RMCGGA");
    AGPS.sendCommand("MPTK_SET_NMEA_UPDATE_1HZ");
    
delay(1000);
    LORA.setTimeout(500);
    
}

void loop()
{
  // clearGps();
 if(AGPS.available()){
    readGPSData();

 }

  readLoraData();
 delay(1000);
 
   
}
void readLoraData(){
   LORA.listen();
   if(LORA.isListening()){


        //read incoming string from slave module
        incomingString=LORA.readString();
        //print incoming string to serial monitor
              Serial.print("here: ");

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

    GPS.listen();
   }
}

void readGPSData(){
  clearGPS();
  String sentence="";
  // GPS.listen();


                 Serial.print("heee: ");

      while(!AGPS.newNMEAreceived()){
        c=AGPS.read();
      }
      AGPS.parse(AGPS.lastNMEA());
      Serial.print("Fix: ");
  Serial.print(AGPS.fix);
  Serial.print(" quality: ");
  Serial.println(AGPS.fixquality);
  Serial.print("Satellites: ");
  Serial.println(AGPS.satellites);
    if (AGPS.fix) {
    Serial.print("Location: ");
    Serial.print(AGPS.latitude, 4);
    Serial.print(AGPS.lat);
    Serial.print(", ");
    Serial.print(AGPS.longitude, 6);
    Serial.println(AGPS.lon);
    Serial.print("Google Maps location: ");
    Serial.print(AGPS.latitudeDegrees, 6);
    Serial.print(", ");
    Serial.println(AGPS.longitudeDegrees, 6);
  sentence=String(AGPS.latitudeDegrees,6)+" "+String(AGPS.longitudeDegrees,6);
   
  }
      sendLoraData(sentence);
        // char c = AGPS.read();

        // Check for the start of a GPS sentence
       
            // String sentence = "";

            // // Read the entire sentence
            // while (GPS.available())
            // {
            //     c = GPS.read();
            //     sentence += c;
            // }
            // Serial.print("sentence: ");

            // Serial.println(sentence);
            //               sendLoraData(sentence);

            // Process the GPS sentence
            // processGPSSentence(sentence);
      
    


}
void sendLoraData(const String& data){
  Serial.println("Sentence test: ");
  Serial.println(data);
    LORA.println("AT+SEND=" + lora_RX_address+","+data.length()+"," + data); 

}

void clearGPS() {
  while (!AGPS.newNMEAreceived()) {
    c = AGPS.read();
  }
  AGPS.parse(AGPS.lastNMEA());

  while (!AGPS.newNMEAreceived()) {
    c = AGPS.read();
  }
  AGPS.parse(AGPS.lastNMEA());
}