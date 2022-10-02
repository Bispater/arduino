const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const axios = require('axios');


const port = new SerialPort({
    path: '/dev/cu.usbmodem14101',
    baudRate: 9600}
)

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

parser.on('data', (line)=>{
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
      });
    console.log('Arduino dice: ' + line)
    port.write('Era una vez ')
})

//CONEXIÓN POST WITH AXIOS FROM NODE JS