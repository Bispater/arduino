import { getDeviceList } from 'usb';
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')


//SOCKET: 
var net = require('net');
const { close } = require('fs');
var port = 8000;            // THE APP DEFINE THIS PORT. 
var host = '192.168.0.120'; // IP FOR CONNECTING WITH THE (IP SERVER OF MINIX).
const devices = getDeviceList();

for (const device of devices) {
  console.log(device); // Legacy device
}

const Arduinoport = new SerialPort({
  /* 
  PATH FROM MAC: path: '/dev/cu.usbmodem14101',
  */

  //PATH FROM RASPBERRY:
  //path: '/dev/ttyACM0',
  path: '/dev/COM5',
  baudRate: 9600}
)

const parser = Arduinoport.pipe(new ReadlineParser({ delimiter: '\r\n' }));


parser.on('data', async (line)=>{

  try{
    var s = require('net').Socket();
    s.connect(port, host);
    s.write('1\n\n');
    s.on('data', function(d){
    console.log(d.toString());
  });
  s.end();
  }catch(e){
    console.log(e);
  }  
})

