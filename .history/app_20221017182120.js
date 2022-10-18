const { getDeviceList } = require('usb')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')


//SOCKET: 
var net = require('net');
const { close } = require('fs');
var port = 8000;            // THE APP DEFINE THIS PORT. 
var host = '192.168.0.120'; // IP FOR CONNECTING WITH THE (IP SERVER OF MINIX).
const devices = getDeviceList();


 SerialPort.list().then(
    (ports) => {
      ports.forEach((port, index) => {
        console.log(
          "# :" + (index + 1) + ")",
          `${port.path}\t22${port.pnpId || ""}\t${port.manufacturer || ""}`
        );
        listaDispositivos.push(port);
      });
    },
    (err) => {
      console.error("Error listing ports", err);
    }
  );


