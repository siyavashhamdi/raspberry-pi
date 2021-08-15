const bootstrap = () => {
    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO
    // 11, 19, 26, 21, 20

    const output = new Gpio(26, 'out');
    output.writeSync(0);
}

console.log("Started test");
bootstrap();
