#include <SoftwareSerial.h>
#include <Adafruit_GPS.h>

#define BAUD 9600
///rx=10 tx=11


String incomingString;
String coords;
//lora software serial instance 
SoftwareSerial LORA(2,3);
SoftwareSerial sGPS(10,11);
Adafruit_GPS GPS(&sGPS);
String gps_coords="";
String lora_RX_address = "1";   //enter Lora RX address

char c;
void setup()
{
    //Baud set to 9600
    Serial.begin(BAUD);
    LORA.begin(BAUD);
    LORA.println("HI");
    GPS.begin(BAUD);
    GPS.sendCommand("PTMK_SET_NMEA_OUTPUT_RMCGGA");
        GPS.sendCommand("PTMK_SET_NMEA_UPDATE_1HZ");
delay(1000);
    LORA.setTimeout(500);
    
}

;void loop()
{
  clearGPS();

  while (!GPS.newNMEAreceived()) {
    c = GPS.read();
  }

  GPS.parse(GPS.lastNMEA());

  // Serial.print("Time: ");
  // Serial.print(GPS.hour, DEC);
  // Serial.print(':');
  // Serial.print(GPS.minute, DEC);
  // Serial.print(':');
  // Serial.print(GPS.seconds, DEC);
  // Serial.print('.');
  // Serial.println(GPS.milliseconds);

  // Serial.print("Date: ");
  // Serial.print(GPS.day, DEC);
  // Serial.print('/');
  // Serial.print(GPS.month, DEC);
  // Serial.print("/20");
  // Serial.println(GPS.year, DEC);

  // Serial.print("Fix: ");
  // Serial.print(GPS.fix);
  // Serial.print(" quality: ");
  // Serial.println(GPS.fixquality);
  // Serial.print("Satellites: ");
  // Serial.println(GPS.satellites);

  if (GPS.fix) {
    // Serial.print("Location: ");
    // Serial.print(GPS.latitude, 4);
    // Serial.print(GPS.lat);
    // Serial.print(", ");
    // Serial.print(GPS.longitude, 4);
    // Serial.println(GPS.lon);
    // Serial.print("Google Maps location: ");
    Serial.print(GPS.latitudeDegrees, 4);
    gps_coords="Lat: "+String(GPS.latitudeDegrees,4);

    // Serial.print(", ");
    // Serial.println(GPS.longitudeDegrees, 4);
    gps_coords=", Long: "+String(GPS.longitudeDegrees,4);

    sendLoraData(gps_coords);
    // Serial.print("Speed (knots): ");
    // Serial.println(GPS.speed);
    // Serial.print("Heading: ");
    // Serial.println(GPS.angle);
    // Serial.print("Altitude: ");
    // Serial.println(GPS.altitude);
  }
  // Serial.println("-------------------------------------");
  
    if(LORA.available())
    {
        //read incoming string from slave module
        incomingString=LORA.readString();
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


void clearGPS() {
  while (!GPS.newNMEAreceived()) {
    c = GPS.read();
  }
  GPS.parse(GPS.lastNMEA());

  while (!GPS.newNMEAreceived()) {
    c = GPS.read();
  }
  GPS.parse(GPS.lastNMEA());
}
void sendLoraData(const String& data){
  
    LORA.println("AT+SEND=" + lora_RX_address+","+data.length()+"," + data); 

}