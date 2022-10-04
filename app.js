
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
//const axios = require('axios');

//SOCKET: 
var net = require('net');
const { close } = require('fs');
var port = 8000;            // THE APP DEFINE THIS PORT. 
var host = '192.168.8.104'; // IP FOR CONNECTING WITH THE (IP SERVER OF MINIX).

const Arduinoport = new SerialPort({
  /* 
  PATH FROM MAC: path: '/dev/cu.usbmodem14101',
  */

  //PATH FROM RASPBERRY:
  path: '/dev/ttyACM0',
  baudRate: 9600}
)

const parser = Arduinoport.pipe(new ReadlineParser({ delimiter: '\r\n' }));
// client = Netcat.client(port, host);

parser.on('data', async (line)=>{

  /* POST FOR HTML SERVER;
    axios.post('https://77dd-186-104-190-226.sa.ngrok.io/_tesscloud/organization/mwx41f4bgK/_tesscontrol/personal_notebook_control/new', {
        name_floor: 'Fred',
      },{headers: {
        "Content-type": "application/json", "X-Parse-Applitcation-Id": 'myAppId', "X-Parse-Master-API-Key": 'myMasterKey'
      }})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });*/
  // local client name
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

