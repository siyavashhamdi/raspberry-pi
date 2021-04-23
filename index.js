var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO
var LED = new Gpio(4, 'in');        //use GPIO pin 4, and specify that it is output

setInterval(() => {
    const res = LED.readSync();
    console.log(res);
}, 1000);
