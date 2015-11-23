var awsIot = require('aws-iot-device-sdk');

var thingShadows = awsIot.thingShadow({
   keyPath: '/home/root/awsCerts/private.pem.key',
  certPath: '/home/root/awsCerts/certificate.pem.crt',
    caPath: '/home/root/awsCerts/root-CA.crt',
  clientId: 'Robot',
    region: 'us-east-1'
});

var clientTokenUpdate;

var	five = require("johnny-five");
var	Edison = require("edison-io");
var	board = new five.Board({
	io: new Edison()
});

const	motorNorth = 2;
const	motorDirNorth = 6;
const	motorSouth = 3;
const	motorDirSouth = 7;
const	motorEast = 4;
const	motorDirEast = 8;
const	motorWest = 5;
const	motorDirWest = 9;

var north;
var south;
var east;
var west;

thingShadows.on('connect', function() {
	// stuff
    });

thingShadows.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('delta', 
    function(thingName, stateObject) {
       console.log('received delta '+' on '+thingName+': '+
                   JSON.stringify(stateObject));
       // phone control logic
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout '+' on '+operation+': '+
                   clientToken);
    });

board.on("ready", function() {
	var led = new five.Led(13);
	led.blink();

	north = new five.Motor([motorNorth, motorDirNorth]);
	south = new five.Motor([motorSouth, motorDirSouth]);
	east  = new five.Motor([motorEast, motorDirEast]);
	west  = new five.Motor([motorWest, motorDirWest]);
});

function	callMotor(sideA, sideB, speed)
{
	// Forward : sideA = West and sideB = East
	sideA.forward(speed);
	sideB.reverse(speed);
}

function	turnRight(speed)
{
	north.forward(speed);
	south.forward(speed);
	east.forward(speed);
	west.forward(speed);
}

function	turnLeft(speed)
{
	north.reverse(speed);
	south.reverse(speed);
	east.reverse(speed);
	west.reverse(speed);
}
