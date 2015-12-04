var SerialPort = require("serialport").SerialPort
var port = new SerialPort("/dev/tty.HC-05-DevB", {
  baudrate: 115200
});


port.on('open', function () {
  console.log('opened');
  port.on('data', function (data) {
    console.log('data received ' + data);
  });
});
