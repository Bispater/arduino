
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const schedule = require('node-schedule');

//SOCKET: 
var net = require('net');
const { close } = require('fs');
const { Console } = require('console');
var port = 8000;                        // THE APP DEFINE THIS PORT. 
var host = '192.168.1.152';             // IP FOR CONNECTING WITH THE (IP SERVER OF MINIX).
var arduinoPATH;

connectSerialPort();

function connectSerialPort () {
  SerialPort.list().then(
    (ports) => {
      ports.forEach((port, index) => {
        /* TESTING LOG
        console.log(
          "# :" + (index + 1) + ")",
          `${port.path}\t22${port.pnpId || ""}\t${""}`
        );*/
        try {
          if (port.manufacturer != undefined) {
            if (port.manufacturer.includes('Arduino')){
              console.log("Device Arduino recognized...")
              //timerClock();
              arduinoPATH = port.path;
              console.log("Arduino PATH: " + port.path)
              connectDevice();
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
        (err) => {
          console.error("Error listing ports", err);
        }
      )
      if (arduinoPATH == undefined){
        console.log("Didn't found a device.")
        setTimeout(()=>{
          console.log("Trying again...")
          connectSerialPort();
        }, 10000)
      }
    }
  );
}

function connectDevice() {

  const Arduinoport = new SerialPort({
    path: arduinoPATH,
    baudRate: 9600
  })

  const parser = Arduinoport.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  parser.on('data', async (line) => {
    try {
      var s = require('net').Socket();
      s.connect(port, host);
      s.on('error', (err) => {
        console.log("Error connecting to IP: ");
        console.log(err)
      });
      console.log("conecting Auxiliar ")
      console.log("Connected to port: " + port);
      s.write('1\n\n');
      console.log("Data sended : 1");
      s.on('data', function (d) {s
        console.log(d.toString());
      });
      s.end();
    } catch (e) {
      console.log(e);
    }
  });
}

function timerClock() {
  const job = schedule.scheduleJob('5 * * * * *', function () {
    console.log('The answer to life, the universe, and everything!');
  });
}

