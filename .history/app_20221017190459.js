
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')


//SOCKET: 
var net = require('net');
const { close } = require('fs');
var port = 8000;            // THE APP DEFINE THIS PORT. 
var host = '192.168.1.152'; // IP FOR CONNECTING WITH THE (IP SERVER OF MINIX).
var arduinoPATH = '';


SerialPort.list().then(
  (ports) => {
    ports.forEach((port, index) => {
      console.log(
        "# :" + (index + 1) + ")",
        `${port.path}\t22${port.pnpId || ""}\t${port.manufacturer || ""}`
      );
      console.log("Nombre del puerto : " + port.manufacturer)
      if (port.manufacturer.includes('Arduino')){
        arduinoPATH = port.manufacturer;
        console.log("Arduino PATH: " + arduinoPATH)
      }      
  },
  (err) => {
    console.error("Error listing ports", err);
  }
  ) 
});


const Arduinoport = new SerialPort({
  /* 
  PATH FROM MAC: path: '/dev/cu.usbmodem14101',
  */

  //PATH FROM RASPBERRY:
  //path: '/dev/ttyACM0',
  path: 'COM5',
  baudRate: 9600}
)


const parser = Arduinoport.pipe(new ReadlineParser({ delimiter: '\r\n' }));
parser.on('data', async (line)=>{
  try{
    var s = require('net').Socket();
    s.connect(port, host);
    console.log("Connected to " + port);
    s.write('1\n\n');
    s.on('data', function(d){
      console.log(d.toString());
    }); 
    s.end();
  }catch(e){
    console.log(e);
  }  
});

