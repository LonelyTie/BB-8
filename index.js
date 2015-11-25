var awsIot = require('aws-iot-device-sdk');

const	certPath = "BLABLA"

// var thingShadows = awsIot.thingShadow({
//    keyPath: certPath + 'private.pem.key',
//   certPath: certPath + 'certificate.pem.crt',
//     caPath: certPath + 'root-CA.crt',
//   clientId: 'Robot',
//     region: 'us-east-1'
// });

var clientTokenUpdate;

var	five = require("johnny-five");
var	Edison = require("edison-io");
var	board = new five.Board({
	io: new Edison()
});

const	motorNorth = 3;
const	motorDirNorth = 2;
const	motorSouth = 5;
const	motorDirSouth = 4;
const	motorEast = 6;
const	motorDirEast = 7;
const	motorWest = 9;
const	motorDirWest = 8;

var north;
var south;
var east;
var west;

var trySpeed = 0;

// thingShadows.on('connect', function() {
// 	// stuff
//     });

// thingShadows.on('status', 
//     function(thingName, stat, clientToken, stateObject) {
//        console.log('received '+stat+' on '+thingName+': '+
//                    JSON.stringify(stateObject));
//     });

// thingShadows.on('delta', 
//     function(thingName, stateObject) {
//        console.log('received delta '+' on '+thingName+': '+
//                    JSON.stringify(stateObject));
//        // phone control logic
//     });

// thingShadows.on('timeout',
//     function(thingName, clientToken) {
//        console.log('received timeout '+' on '+operation+': '+
//                    clientToken);
//     });

function	startMotor(sideA, sideB, speed)
{
	// Forward : sideA = West and sideB = East
	sideA.forward(speed);
	sideB.reverse(speed);
}

function	stopMotor(sideA, sideB)
{
	// Forward : sideA = West and sideB = East
	sideA.stop();
	sideB.stop();
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

board.on("ready", function() {
	var led = new five.Led(13);
	led.blink();

	north = new five.Motor({
		pins :{
		pwm : motorNorth,
		dir : motorDirNorth
	}
	});
	south = new five.Motor({
		pins :{
		pwm : motorSouth,
		dir : motorDirSouth
	}
	});
	east  = new five.Motor({
		pins :{
		pwm : motorEast, 
		dir : motorDirEast
	}
	});
	west  = new five.Motor({
		pins :{
		pwm : motorWest, 
		dir : motorDirWest
	}
	});

	// DEBUG
	button = new five.Button(12);
	board.repl.inject({
    	button: button
	});
	button.on("down", function() {
		trySpeed ^= 1;
		(trySpeed) ? startMotor(north, south, 100 * trySpeed ) : stopMotor(north, south);
		console.log("down");
	}); 
	  button.on("hold", function() {
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
  });
});



