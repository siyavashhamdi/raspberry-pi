const bootstrap = () => {
    const pin = {
        input: [2, 3, 4, 17, 27, 22, 10, 9],
        output: [11, 5, 6, 13, 19, 26, , 21, 20],
        indicator: [16, 12],
        buzzer: [7],
        key: [8],
        simReset: [18],
    };

    var Gpio = require('onoff').Gpio;   //include onoff to interact with the GPIO
    var LED2 = new Gpio(2, 'in');
    var LED3 = new Gpio(7, 'out');

    let index = 0;
    setInterval(() => {
        const currPin = pin.indicator[index];
        const indicator = new Gpio(currPin, 'out');

        const currValue = indicator.readSync(currPin);

        index += 1;
        if (index >= pin.indicator.length)
            index = 0;

        indicator.writeSync(!currValue);

        const currentDate = new Date().toISOString();
        console.log(`[${ currentDate }] { currPin: ${ currPin }, !currValue: ${ !currValue } }`);
    }, 1000);
}

console.log("Started");
bootstrap();
