
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const axios = require('axios');
var Netcat = require('node-netcat');

//Socket
var net = require('net');
const { close } = require('fs');
var port = 8000; // PORT FOR CONNECTING WITH THE IP SERVER OF MINIX.
//192.168.100.19
// RINNO MINIX 192.168.8.101
var host = '192.168.64.70'; // IP FOR CONNECTING WITH THE IP SERVER OF MINIX.

const Arduinoport = new SerialPort({
  /* 
  PATH FROM MAC
  path: '/dev/cu.usbmodem14101',
  PATH FROM RASPBERRY
  path: '/dev/ttyACM0'
  */
  path: '/dev/cu.usbmodem14101',
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
  var s = require('net').Socket();
  s.connect(port, host);
  s.write('test\n\n');
  s.on('data', function(d){
    console.log(d.toString());
  });
  s.end();
  /*
      console.log('Move!', line)
      var scan = Netcat.portscan();

      scan.run(host, port, function (err, res) {
        console.log(err, res);	
      });  
  */
      // var client = Netcat.client(port, host);
      
      /*client.on('open', function () {
        console.log('connect');
        client.send('1' + '\n');
        
      });

       client.on('data', function (data) {
        console.log(data.toString('ascii'));
        client.send('Goodbye!!!', true);
      });
 
      client.on('error', function (err) {
        console.log(err);
      });   
      
      client.on('close', function () {
        console.log('close');
      });
*/
      // client.send('1' + '\n');
      // client.start();

    /* var client = new net.Socket();
    client.connect(port, host, function() {
      console.log(`sending to server: a.random.test`)
      client.write(`1\n`)  
      client.setTimeout(1000);                        
    }); */
    
    

  /*
    console.log("=============================")
    try {
      var Hobbits = getConnection("Hobbits");
      // message
      writeData(Hobbits,"1");
    }catch(e){
      console.log(e);
    }
    */
  })

/*
function getConnection(connName){
	var client = net.connect({port,host},function(){
		console.log(connName + ' Connected:');
		console.log('  Local = %s:%s',this.localAddress,this.localPort);
		console.log('  Remote = %s:%s',this.remoteAddress,this.remotePort);
		this.setTimeout(500);
		this.setEncoding('utf8');

    //log with de data that we are sending
		this.on('data',function(data){
			console.log(data.toString());
			this.end();
		});
    //connection end
		this.on('end',function(){
			console.log(connName + 'Client disconnected');
		});
    //error displayed on console log
		this.on('error',function(err){
			console.log('Socket Error: ',JSON.stringify(err));
      console.log("=============================")

		});
    //socket isn't responding
		this.on('timeout',function(){
    console.log('Socket Timed Out');
    console.log("=============================")
    try{      
      //client.destroy();
    }catch(e){
      console.log(e);
    }

		});
    //socket closed
		this.on('close',function(){
			console.log('Socket Closed');
      console.log("=============================")

		});
	});
  return client;
}

function writeData(socket,data){
	var success = !socket.write(data);
	if(!success){
		(function(socket,data){
			socket.once('drain',function(){
				writeData(socket,data);
			});
		})(socket,data);
	}
}
*/